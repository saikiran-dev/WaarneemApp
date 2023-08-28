<template>
  <v-menu
    ref="endtime"
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
        append-icon="mdi-clock-time-three-outline"
        :rules="[
          rules.required,
          rules.endTime(shiftItem.startTime, shift.endTime),
        ]"
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="endTimePicker"
      v-model="shift.endTime"
      @click:minute="$refs.endtime.save(shift.endTime)"
      @change="updateParentForm"
      format="24hr"
      :rules="[rules.required]"
    ></v-time-picker>
  </v-menu>
</template>
<script>
export default {
  props: {
    rules: {
      type: Object,
    },
    shiftItem: {
      type: Object,
    },
    isEditRecord: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      shift: {
        endTime: '',
        date: this.shiftItem.date,
      },
      endTimePicker: false,
    }
  },
  mounted() {
    if (this.isEditRecord) {
      this.shift.endTime = this.shiftItem.endTime
    }
  },
  methods: {
    updateParentForm() {
      this.$emit('update', this.shift)
    },
  },
}
</script>
