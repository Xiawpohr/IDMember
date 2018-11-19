<template>
  <form @submit.prevent="$emit('submitted', auth)" >
    <input type="text" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <input type="password" placeholder="Password Again" v-model="confirmedPassword">
    <button type="submit">Sign Up</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmedPassword: ''
    }
  },
  computed: {
    auth() {
      return {
        email: this.email,
        password: this.password
      }
    }
  }
}
</script>

<style>

</style>
