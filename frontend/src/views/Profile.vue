<template>
  <div>
    <h1>Your Profile</h1>
    <ProfileForm :user="currentUser"/>
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
      currentUser: {}
    }
  }
}
</script>
