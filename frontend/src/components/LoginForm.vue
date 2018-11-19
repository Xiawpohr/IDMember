<template>
  <form @submit.prevent="$emit('submitted', auth)">
    <input type="text" placeholder="Email" v-model="Email">
    <input type="password" placeholder="Password" v-model="password">
    <button type="submit">Log In</button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
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
