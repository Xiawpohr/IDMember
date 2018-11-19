<template>
  <v-app>
    <v-content>
      <v-container>
        <router-view/>
      </v-container>
    </v-content>
    <BottomNav />
  </v-app>
</template>

<script>
import BottomNav from '@/components/BottomNav.vue'

export default {
  components: {
    BottomNav
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

