<template>
  <v-simple-table>
    <template v-slot:default>
      <tbody>
        <tr v-for="item in shifts" :key="item.date">
          <td>{{ item.date }}</td>
          <td>{{ item.startTime }}</td>
          <td>{{ item.endTime }}</td>
          <td>{{ item.selectedType }}</td>
          <td>{{ item.price }}</td>
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
