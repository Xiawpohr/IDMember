<template>
  <div>
    <h1>Your Profile</h1>
    <ProfileForm :user="currentUser" @submitted="saveUser" />
  </div>
</template>

<script>
import ProfileForm from '@/components/ProfileForm.vue'

export default {
  components: {
    ProfileForm
  },
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser
    }
  },
  methods: {
    fetchCurrentUser() {
      this.$store.dispatch('user/fetchCurrentUser')
    },
    saveUser(user) {
      this.$store.dispatch('user/saveUser', user)
    }
  },
  created() {
    this.fetchCurrentUser()
  }
}
</script>
