<template>
  <div class="home">
    <h1>Discover Your Friends</h1>
    <UserList :users="users"/>
  </div>
</template>

<script>
import UserList from '@/components/UserList.vue'

export default {
  name: 'home',
  components: {
    UserList
  },
  computed: {
    users() {
      return this.$store.state.users
    }
  }
}
</script>
