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
  data() {
    return {
      currentUser: {
        firstName: 'Arthur',
        lastName: 'Hsiao'
      }
    }
  },
  methods: {
    saveUser(user) {
      
    }
  }
}
</script>
