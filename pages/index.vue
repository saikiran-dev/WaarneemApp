<template>
  <div>
    <div>
      <h2 class="heading-text d-inline">
        Filters
        <p class="underline-decoration"></p>
      </h2>
      <v-range-slider></v-range-slider>
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
          <v-btn variant="flat" block size="x-large" @click="enableDrawer"
            >ADD SHIFT</v-btn
          >
        </v-col>
      </v-row>

      <v-card
        v-for="(record, index) in records"
        :key="index"
        class="my-6 rounded-lg"
        :elevation="20"
      >
        <v-row align="center" justify="space-between">
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
      <h4 class="text-center mt-6" v-if="!records.length">No Shifts to View</h4>
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
      range: [],
      sortedPrices: [],
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
    shifts() {
      const prices = []
      this.shifts.forEach((shift) => {
        prices.push(+shift.price)
      })
      prices.sort((priceOne, priceTwo) => priceOne - priceTwo)
      this.sortedPrices = prices
      this.rangeValue = [
        this.sortedPrices[0],
        this.sortedPrices[this.sortedPrices.length - 1],
      ]
    },
  },
  // mounted() {

  // },
  methods: {
    editContent(shift) {
      this.$store.commit('drawer/SET_DRAWER', true)
      this.$store.commit('record/SET_EDIT_RECORD', shift)
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
