<template>
  <div>
    <h1 class="display-2 font-weight-medium teal--text text-xs-center">
      Discover Your Friends
    </h1>
    <div class="pt-3">
      <UserList :users="users">
        <template slot-scope="props">
          <UserItem :user="props.user" />
        </template>
      </UserList>
    </div>
  </div>
</template>

<script>
import UserList from '@/components/UserList.vue'
import UserItem from '@/components/UserItem.vue'

export default {
  name: 'home',
  components: {
    UserList,
    UserItem
  },
  computed: {
    users() {
      return this.$store.state.user.users
    }
  },
  methods: {
    fetchUsers() {
      this.$store.dispatch('user/fetchUsers')
    },
    fetchFriendRequests() {
      this.$store.dispatch('friend/fetchFriendRequests')
    },
    fetchFriendConfirmations() {
      this.$store.dispatch('friend/fetchFriendConfirmations')
    }
  },
  created() {
    this.fetchUsers()
    this.fetchFriendRequests()
    this.fetchFriendConfirmations()
  }
}
</script>
