<template>
  <div>
    <div>
      <h2 class="heading-text d-inline">
        Filters
        <p class="underline-decoration"></p>
      </h2>
      <v-range-slider
        v-if="sortedPrices && rangeValue"
        v-model="rangeValue"
        :tick-labels="sortedPrices"
        :max="sortedPrices.length - 1"
        tick-size="4"
      ></v-range-slider>
    </div>
    <div>
      <v-row align="center" justify="space-between">
        <v-col cols="auto">
          <h2 class="heading-text">
            Shifts
            <p class="underline-decoration"></p>
          </h2>
        </v-col>
        <v-col cols="auto">
          <v-btn
            class="white--text"
            color="grey darken-3"
            variant="flat"
            block
            size="x-large"
            @click="enableDrawer"
            >ADD SHIFT</v-btn
          >
        </v-col>
      </v-row>

      <v-card
        class="my-6 rounded-lg"
        v-for="(record, index) in filteredRecords"
        :key="index"
        :elevation="20"
      >
        <v-row class="pr-4" align="center" justify="space-between">
          <v-col cols="auto">
            <v-card-title>{{ record.title }}</v-card-title>
          </v-col>
          <v-col cols="auto">
            <v-icon large color="grey darken-2" @click="editContent(record)">
              mdi-pencil
            </v-icon>
          </v-col>
        </v-row>
        <v-card-subtitle>{{ record.description }}</v-card-subtitle>
        <v-card-text>
          <h5 class="text-h6">Dates</h5>
          <SimpleTable :shifts="record.shifts" />
        </v-card-text>
      </v-card>
      <h4 class="text-center mt-6" v-if="!filteredRecords.length">
        No Shifts to View
      </h4>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SimpleTable from '../components/elements/SimpleTable.vue'
export default {
  name: 'IndexPage',
  components: {
    SimpleTable,
  },
  data() {
    return {
      sortedPrices: [],
      rangeValue: [],
      filteredRecords: [],
    }
  },
  computed: {
    ...mapState({
      records: (state) => state.record.records,
    }),
    shifts() {
      let shifts = []

      if (this.records.length) {
        this.records.forEach((element) => {
          shifts = [...shifts, ...element.shifts]
        })
      }

      return shifts
    },
  },
  watch: {
    rangeValue() {
      this.filteredRecords = []
      this.filterRecords()
    },
  },
  mounted() {
    this.setRanges()
  },
  methods: {
    filterRecords() {
      const price = [
        this.sortedPrices[this.rangeValue[0]],
        this.sortedPrices[this.rangeValue[1]],
      ]
      const localRecords = JSON.parse(JSON.stringify(this.records))
      localRecords.forEach((record) => {
        const localShifts = []
        record.shifts.forEach((shift) => {
          if (
            parseInt(shift.price) >= price[0] &&
            parseInt(shift.price) <= price[1]
          ) {
            localShifts.push(shift)
          }
        })
        if (localShifts.length) {
          const recordObject = { ...record }
          recordObject.shifts = localShifts
          this.filteredRecords.push(recordObject)
        }
      })
    },
    setRanges() {
      const prices = []
      this.shifts.forEach((shift) => {
        prices.push(+shift.price)
      })
      prices.sort((priceOne, priceTwo) => priceOne - priceTwo)
      this.sortedPrices = prices
      this.rangeValue = [0, this.sortedPrices.length - 1]
    },
    editContent(shift) {
      this.$store.commit('drawer/SET_DRAWER', true)
      const record = this.records.find((record) => record.id === shift.id)
      if (record !== undefined) {
        this.$store.commit('record/SET_EDIT_RECORD', record)
      }
    },
    enableDrawer() {
      this.$store.commit('drawer/SET_DRAWER', true)
    },
  },
}
</script>
<style scoped>
.heading-text {
  position: relative;
}
.underline-decoration {
  border: 2px solid rgb(239, 15, 30);
  position: absolute;
  width: 75%;
}
</style>
