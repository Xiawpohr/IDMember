<template>
  <div>
    <h1>IDMember</h1>
    <LoginForm @submitted="login" />
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'

export default {
  components: {
    LoginForm
  },
  methods: {
    login(auth) {
      this.$store.dispatch('auth/login', auth)
    }
  }
}
</script>
