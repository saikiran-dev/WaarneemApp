<template>
  <v-menu
    ref="startime"
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
        :rules="[rules.required]"
        append-icon="mdi-clock-time-three-outline"
      ></v-text-field>
    </template>
    <v-time-picker
      :rules="[rules.required]"
      v-if="startTimePicker"
      v-model="shift.startTime"
      @click:minute="$refs.startime.save(shift.startTime)"
      @change="updateParentForm"
      format="24hr"
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
        startTime: '',
        date: this.shiftItem.date,
      },
      startTimePicker: false,
    }
  },

  mounted() {
    if (this.isEditRecord) {
      this.shift.startTime = this.shiftItem.startTime
    }
  },
  methods: {
    updateParentForm() {
      this.$emit('update', this.shift)
    },
  },
}
</script>
