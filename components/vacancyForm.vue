<template>
  <div>
    <v-list>
      <v-list-item-title>Create/Edit</v-list-item-title>
      <v-form ref="vacancyform" lazy-validation>
        <label>Title</label>
        <v-text-field
          v-model="formData.title"
          maxlength="100"
          :rules="[rules.required]"
          placeholder="Title"
          outlined
          required
          hint="This field uses maxlength of 100"
        ></v-text-field>

        <label>Description</label>
        <v-textarea
          v-model="formData.description"
          outlined
          placeholder="Description"
          :rules="[rules.length(500)]"
        ></v-textarea>
        <label>Dates</label>
        <v-menu
          v-model="isCalendar"
          :close-on-content-click="false"
          max-width="290"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="formData.dates"
              :rules="[rules.dates]"
              outlined
              clearable
              readonly
              v-bind="attrs"
              v-on="on"
              @click:clear="formData.dates = null"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="formData.dates"
            @change="isCalendar = false"
            @input="updateShifts"
            multiple
          ></v-date-picker>
        </v-menu>
        <div
          class="mb-6"
          v-for="shiftItem in formData.shifts"
          :key="shiftItem.date"
        >
          <!-- WORK SHIFT FORM -->
          <v-row no-gutters justify="space-between">
            <v-col cols="auto">
              <p>{{ shiftItem.date }}</p>
            </v-col>
            <v-col cols="auto">
              <v-btn x-small width="100%" @click="removeShift(shiftItem.date)"
                >delete</v-btn
              >
            </v-col>
          </v-row>
          <!-- startTimePicker -->
          <v-card elevation="5" outlined>
            <v-card-text>
              <v-row no-gutters>
                <v-col>
                  <StartTimePicker
                    :isEditRecord="isEditRecord"
                    :rules="rules"
                    @update="updateStartDate"
                    :shiftItem="shiftItem"
                  />
                </v-col>
                <v-col>
                  <EndTimePicker
                    :isEditRecord="isEditRecord"
                    :rules="rules"
                    @update="updateEndDate"
                    :shiftItem="shiftItem"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    type="number"
                    v-model="shiftItem.price"
                    :rules="[rules.required]"
                    outlined
                    placeholder="Price"
                    append-icon="mdi-currency-eur"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <v-select
                    :items="types"
                    outlined
                    v-model="shiftItem.selectedType"
                    placeholder="Select Type"
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </div>
      </v-form>
    </v-list>

    <v-row no-gutters>
      <v-col class="mr-4" v-if="isEditRecord">
        <v-btn outlined x-large width="100%" @click="deleteRecord"
          >Delete</v-btn
        >
      </v-col>
      <v-col>
        <v-btn
          class="white--text"
          color="grey darken-3"
          x-large
          width="100%"
          @click="saveRecord"
          >Save</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import StartTimePicker from './elements/StartTimePicker.vue'
import EndTimePicker from './elements/EndTimePicker.vue'
export default {
  components: {
    StartTimePicker,
    EndTimePicker,
  },
  data() {
    return {
      rules: {
        title: (v) => v.length > 10 || 'Max 10 characters',
        required: (v) => !!v || 'This field is required',
        length: (len) => (v) =>
          (v || '').length < len || `Invalid character length, required ${len}`,
        dates: (value) =>
          (value && value.length > 0 && value.length < 11) ||
          'Min of 1 and max of 10 dates are allowed',
        endTime: (startTime, value) =>
          this.validateEndTime(startTime, value) ||
          'End Time should be greater than start time',
      },
      formData: {
        id: crypto.randomUUID(),
        title: '',
        description: '',
        shifts: [],
        dates: [],
      },
      shift: {
        id: crypto.randomUUID(),
        startTime: '',
        endTime: '',
        price: null,
        selectedType: '',
        date: '',
      },
      isCalendar: false,
      types: ['Consultation', 'Telephone', 'Ambulance'],
    }
  },
  computed: {
    ...mapState({
      editRecord: (state) => state.record.editRecord,
      isEditRecord: (state) => state.record.isEditRecord,
      editShifts: (state) => state.record.editShifts,
    }),
  },

  mounted() {
    if (this.isEditRecord) {
      this.formData = this.editRecord
      this.formData.dates = this.editShifts
    }
  },

  methods: {
    deleteRecord() {
      this.$store.commit('drawer/SET_DRAWER', false)
      this.$store.commit('record/DELETE_RECORD', this.formData.id)
    },
    saveRecord() {
      if (this.$refs.vacancyform.validate()) {
        this.$store.commit('record/SET_RECORD', this.formData)
        this.$store.commit('drawer/SET_DRAWER', false)
      }
    },
    removeShift(shiftDate) {
      this.formData.shifts = this.formData.shifts.filter(
        (shift) => shift.date !== shiftDate
      )

      this.formData.dates = this.formData.dates.filter(
        (date) => date !== shiftDate
      )
    },

    updateShifts(dates) {
      if (!this.formData.shifts.length) {
        const tempObj = { ...this.shift, date: this.formData.dates[0] }
        this.formData.shifts.push(tempObj)
      } else {
        dates.forEach((date) => {
          const check = this.formData.shifts.find(
            (shift) => shift.date === date
          )
          if (check === undefined) {
            const tempObj = { ...this.shift }
            tempObj.id = crypto.randomUUID()
            tempObj.date = date
            this.formData.shifts.push(tempObj)
          }
        })

        // ADDITIONAL FUNCTIONALITY
        this.formData.shifts = this.formData.shifts.filter((shift) =>
          dates.includes(shift.date)
        )
      }
    },

    updateStartDate(shiftTime) {
      const shiftIndex = this.formData.shifts.findIndex(
        (shift) => shift.date === shiftTime.date
      )
      if (shiftIndex !== -1) {
        this.formData.shifts[shiftIndex].startTime = shiftTime.startTime
      }
    },
    updateEndDate(shiftTime) {
      const shiftIndex = this.formData.shifts.findIndex(
        (shift) => shift.date === shiftTime.date
      )
      if (shiftIndex !== -1) {
        this.formData.shifts[shiftIndex].endTime = shiftTime.endTime
      }
    },

    validateEndTime(strStartTime, strEndTime) {
      if (strStartTime && strEndTime) {
        let hours = this.getHours(strStartTime)
        let minutes = this.getMinutes(strStartTime)
        const startTime = new Date().setHours(hours, minutes, 0)

        hours = this.getHours(strEndTime)
        minutes = this.getMinutes(strEndTime)
        const endTime = new Date().setHours(hours, minutes, 0)

        return endTime > startTime
      }
      return true
    },
    getHours(time) {
      const hours = parseInt(time.split(':')[0])
      return hours
    },
    getMinutes(time) {
      const minutes = parseInt(time.split(':')[1])
      return minutes
    },
  },
}
</script>
