<template>
  <div>
    <v-row justify="space-between">
      <v-col cols="auto">
        <p>{{ date }}</p>
      </v-col>
      <v-col cols="auto">
        <v-btn x-small width="100%" @click="deleteShift">delete</v-btn>
      </v-col>
    </v-row>
    <v-form ref="shiftform" lazy-validation>
      <div class="d-flex">
        <v-menu
          ref="starttimemenu"
          v-model="startTimePicker"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="shift.startTime"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="shift.startTime"
              outlined
              placeholder="Start Time"
              readonly
              v-bind="attrs"
              v-on="on"
              class="mr-2"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="startTimePicker"
            v-model="shift.startTime"
            @click:minute="$refs.starttimemenu.save(shift.startTime)"
            @change="updateParentForm"
            format="24hr"
          ></v-time-picker>
        </v-menu>
        <v-menu
          ref="endtimemenu"
          v-model="endTimePicker"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="shift.endTime"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="shift.endTime"
              outlined
              placeholder="End Time"
              readonly
              v-bind="attrs"
              v-on="on"
              class="mr-2"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="endTimePicker"
            v-model="shift.endTime"
            @click:minute="$refs.endtimemenu.save(shift.endTime)"
            @change="updateParentForm"
            format="24hr"
          ></v-time-picker>
        </v-menu>
        <v-text-field
          type="number"
          v-model="shift.price"
          :rules="[rules.required]"
          outlined
          placeholder="Price"
          @change="updateParentForm"
        ></v-text-field>
      </div>
    </v-form>
    <v-select
      @change="updateParentForm"
      :items="types"
      outlined
      v-model="shift.selectedType"
      placeholder="Select Type"
      :rules="[rules.required]"
    ></v-select>
  </div>
</template>
<script>
export default {
  props: {
    date: {
      type: String,
      required: true,
    },
    editShift: {
      type: Object,
    },
  },
  data() {
    return {
      shift: {
        id: crypto.randomUUID(),
        startTime: '',
        endTime: '',
        price: null,
        selectedType: '',
        date: this.date,
      },
      rules: {
        required: (v) => !!v || 'This field is required',
      },
      startTimePicker: false,
      endTimePicker: false,
      types: ['Consultation', 'Telephone', 'Ambulance'],
    }
  },
  mounted() {
    if (this.editShift) {
      this.shift = this.editShift
    }
  },

  methods: {
    updateParentForm() {
      if (this.$refs.shiftform.validate()) {
        this.$emit('formValid', true)
        this.$emit('update', this.shift)
      } else {
        this.$emit('formValid', false)
      }
    },

    deleteShift() {
      this.$emit('delete', this.shift.date)
    },
  },
}
</script>
