<template>
  <form @submit.prevent="$emit('submitted', modifiedUser)">
    <p>profile form</p>
    <input type="text" v-model="firstName"/>
    <input type="text" v-model="lastName"/>
    <button type="submit">Save</button>
  </form>
</template>

<script>
export default {
  props: {
    user: {
      types: Object,
      default: () => ({
        firstName: '',
        lastName: ''
      })
    }
  },
  data() {
    return {
      firstName: this.user.firstName,
      lastName: this.user.lastName
    }
  },
  computed: {
    modifiedUser() {
      return {
        firstName: this.firstName,
        lastName: this.lastName
      }
    }
  }
}
</script>
