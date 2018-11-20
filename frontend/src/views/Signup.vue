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
      <SignupForm @submitted="signup" />
      <div class="mt-3 text-xs-center">
        <v-btn
          to='/login'
          flat
          color="teal"
        >
          Go to Log In
        </v-btn>
      </div>
    </div>
  </v-layout>
</template>

<script>
import SignupForm from '@/components/SignupForm.vue'

export default {
  components: {
    SignupForm
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
        this.$router.push('/profile')
      }
    }
  },
  methods: {
    signup(auth) {
      this.$store.dispatch('auth/signup', auth)
    }
  }
}
</script>
