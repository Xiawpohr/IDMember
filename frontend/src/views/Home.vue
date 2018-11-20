<template>
  <div>
    <h1 class="display-2 font-weight-medium teal--text text-xs-center">
      Discover Your Friends
    </h1>
    <div class="pt-3">
      <UserList :users="users"/>
    </div>
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
      return this.$store.state.user.users
    }
  },
  methods: {
    fetchUsers() {
      this.$store.dispatch('user/fetchUsers')
    }
  },
  created() {
    this.fetchUsers()
  }
}
</script>
