<template>
  <div>
    <h1 class="display-2 font-weight-medium teal--text text-xs-center">
      Your Profile
    </h1>
    <div class="pt-4">
      <UserProfileForm :user="currentUser" @submitted="saveUser" />
    </div>
  </div>
</template>

<script>
import UserProfileForm from '@/components/UserProfileForm.vue'

export default {
  components: {
    UserProfileForm
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
