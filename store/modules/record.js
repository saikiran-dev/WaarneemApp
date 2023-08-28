const state = {
  records: [],
  editRecord: {},
  isEditRecord: false,
  editShifts: [],
  priceRange: [],
}

const mutations = {
  SET_RECORD(state, value) {
    if (value && value.id) {
      const existingRecords = state.records.filter(
        (record) => record.id !== value.id
      )
      existingRecords.push(value)
      state.records = existingRecords
    }

    state.editRecord = {}
    state.isEditRecord = false
  },
  SET_EDIT_RECORD(state, value) {
    state.editRecord = value
    state.isEditRecord = true
    const dates = []
    if (value.shifts.length) {
      value.shifts.forEach((element) => {
        dates.push(element.date)
      })
    }

    state.editShifts = dates
  },
  DELETE_RECORD(state, value) {
    const existingRecords = state.records
    state.records = existingRecords.filter((record) => record.id !== value)
    state.editRecord = {}
    state.isEditRecord = false
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
