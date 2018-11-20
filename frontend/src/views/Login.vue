<template>
  <v-layout justify-center align-center style="height: 100vh">
    <v-progress-circular
      v-if="isLoading"
      :size="150"
      :width="20"
      color="teal"
      indeterminate
    />
    <div v-else>
      <LoginForm @submitted="login" />
      <div class="mt-3 text-xs-center">
        <v-btn
          to='/signup'
          flat
          color="teal"
        >
          Go to Sign Up
        </v-btn>
      </div>
    </div>
  </v-layout>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'

export default {
  components: {
    LoginForm
  },
  computed: {
    isLoading() {
      return this.$store.state.auth.isLoading
    },
    userId() {
      return this.$store.state.auth.id
    }
  },
  watch: {
    userId(val) {
      if (val !== null) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    login(auth) {
      this.$store.dispatch('auth/login', auth)
    }
  }
}
</script>
