<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
      width="40%"
      class="px-6"
    >
      <VacancyForm v-if="rightDrawer" />
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import VacancyForm from '@/components/vacancyForm.vue'
export default {
  name: 'DefaultLayout',
  components: {
    VacancyForm,
  },
  data() {
    return {
      clipped: false,
      fixed: false,
      right: true,
      title: 'WaarneemApp',
      rightDrawer: false,
    }
  },
  computed: {
    ...mapState({
      drawer: (state) => state.drawer.drawer,
    }),
  },
  watch: {
    drawer() {
      this.rightDrawer = this.drawer
    },
    rightDrawer() {
      this.$store.commit('drawer/SET_DRAWER', this.rightDrawer)
      if (!this.rightDrawer) {
        this.$store.commit('record/SET_RECORD', {})
      }
    },
  },
}
</script>
