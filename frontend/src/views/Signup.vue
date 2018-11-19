<template>
  <div>
    <h1>IDMember Sign Up</h1>
    <SignupForm @submitted="signup" />
  </div>
</template>

<script>
import SignupForm from '@/components/SignupForm.vue'

export default {
  components: {
    SignupForm
  },
  methods: {
    signup(auth) {

    }
  }
}
</script>

<style>

</style>
