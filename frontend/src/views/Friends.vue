<template>
  <div>
    <h1 class="display-2 font-weight-medium teal--text text-xs-center">
      Your friends are here! You can give them some money
    </h1>
    <div class="pt-3">
      <UserList :users="friends"/>
    </div>
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
  created() {
    this.fetchFriends()
  }
}
</script>
