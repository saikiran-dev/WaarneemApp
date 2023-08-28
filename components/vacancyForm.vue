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
            multiple
          ></v-date-picker>
        </v-menu>
      </v-form>
    </v-list>

    <div v-if="isEditRecord">
      <div class="d-flex" v-for="shift in formData.shifts" :key="shift.date">
        <WorkerShifts
          @update="changeShifts"
          :date="shift.date"
          :editShift="shift"
          @delete="removeShift"
          ref="childComponent"
        />
      </div>
    </div>
    <div v-else class="d-flex" v-for="date in formData.dates" :key="date">
      <WorkerShifts
        ref="childComponent"
        @update="changeShifts"
        :date="date"
        @delete="removeShift"
        @formValid="setShiftForm"
      />
    </div>

    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-btn outlined x-large width="100%" @click="deleteRecord"
          >Delete</v-btn
        >
      </v-col>
      <v-col cols="auto">
        <v-btn x-large width="100%" @click="saveRecord">Save</v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import workerShifts from './workerShifts.vue'
export default {
  components: {
    workerShifts,
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
      },
      formData: {
        id: crypto.randomUUID(),
        title: '',
        description: '',
        shifts: [],
        dates: [],
      },
      isCalendar: false,
      isShiftFormValid: false,
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
    changeShifts(event) {
      this.formData.shifts = this.formData.shifts.filter(
        (shift) => shift.date !== event.date
      )
      this.formData.shifts.push(event)
    },

    saveRecord() {
      if (this.$refs.vacancyform.validate()) {
        this.$store.commit('record/SET_RECORD', this.formData)
        this.$store.commit('drawer/SET_DRAWER', false)
      }
    },

    setShiftForm(value) {
      this.isShiftFormValid = value
    },
    removeShift(shiftDate) {
      this.formData.shifts = this.formData.shifts.filter(
        (shift) => shift.date !== shiftDate
      )

      this.formData.dates = this.formData.dates.filter(
        (date) => date !== shiftDate
      )
    },
  },
}
</script>
