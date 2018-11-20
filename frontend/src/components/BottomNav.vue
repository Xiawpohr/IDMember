<template>
  <v-bottom-nav app :value="isAuth">
    <v-btn
      color="teal"
      flat
      value="discover"
      to="/"
    >
      <span>Discover</span>
      <v-icon>whatshot</v-icon>
    </v-btn>
    <v-btn
      color="teal"
      flat
      value="friends"
      to="/friends"
    >
      <span>Friends</span>
      <v-icon>favorite</v-icon>
    </v-btn>
    <v-btn
      color="teal"
      flat
      value="profile"
      to="profile"
    >
      <span>Profile</span>
      <v-icon>person</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
export default {
  computed: {
    isAuth() {
      return this.$store.state.auth.id !== null
    }
  }
}
</script>

