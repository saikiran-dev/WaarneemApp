const state = {
  records: [
    {
      id: 'a0197a97-2bf5-429c-a40e-e92256c470cd',
      title: 'asfd',
      description: 'asdf',
      shifts: [
        {
          id: '585fad33-1165-40a5-b0dd-43422f356a24',
          startTime: '21:45',
          endTime: '22:55',
          price: '10',
          selectedType: 'Telephone',
          date: '2023-08-22',
        },
        {
          id: '585fad33-1165-40a5-b0dd-43422f356a24',
          startTime: '21:45',
          endTime: '22:55',
          price: '24',
          selectedType: 'Telephone',
          date: '2023-08-22',
        },
        {
          id: '585fad33-1165-40a5-b0dd-43422f356a24',
          startTime: '21:45',
          endTime: '22:55',
          price: '45',
          selectedType: 'Telephone',
          date: '2023-08-22',
        },
        {
          id: '585fad33-1165-40a5-b0dd-43422f356a24',
          startTime: '21:45',
          endTime: '22:55',
          price: '433',
          selectedType: 'Telephone',
          date: '2023-08-22',
        },
        {
          id: '982609ef-c8ea-486f-b202-54326904dc17',
          startTime: '20:11',
          endTime: '23:06',
          price: '455',
          selectedType: 'Ambulance',
          date: '2023-08-23',
        },
        {
          id: '982609ef-c8ea-486f-b202-54326904dc17',
          startTime: '07:30',
          endTime: '18:06',
          price: '76',
          selectedType: 'Consultation',
          date: '2023-08-24',
        },
      ],
      dates: ['2023-08-22', '2023-08-23', '2023-08-24'],
    },
  ],
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
