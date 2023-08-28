<template>
  <v-simple-table>
    <template v-slot:default>
      <tbody>
        <tr
          class="grey darken-3 white--text"
          v-for="(item, index) in shifts"
          :key="index"
        >
          <td>{{ item.date }}</td>
          <td>{{ item.startTime }}</td>
          <td>{{ item.endTime }}</td>
          <td>{{ item.selectedType }}</td>
          <td class="d-flex align-center">
            <v-icon color="white" x-small aria-hidden="false">
              mdi-currency-eur </v-icon
            >{{ item.price }}
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
export default {
  props: {
    shifts: {
      type: Array,
      required: true,
      default: function () {
        return []
      },
    },
  },
}
</script>
