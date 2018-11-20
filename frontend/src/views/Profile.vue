<template>
  <div>
    <h1 class="display-2 font-weight-medium teal--text text-xs-center ">
      Your Profile
    </h1>
    <div class="pt-4">
      <ProfileForm :user="currentUser" @submitted="saveUser" />
    </div>
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
