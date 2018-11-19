<template>
  <div>
    <h1>Your friends are here! You can give them some money</h1>
    <UserList :users="friends"/>
  </div>
</template>

<script>
import UserList from '@/components/UserList.vue'

export default {
  components: {
    UserList
  },
  computed: {
    friends() {
      return this.$store.state.friend.friends
    }
  },
  methods: {
    fetchFriends() {
      this.$store.dispatch('friend/fetchAll')
    }
  },
  created () {
    this.fetchFriends()
  }
}
</script>
