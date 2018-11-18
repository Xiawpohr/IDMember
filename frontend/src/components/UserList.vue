<template>
  <div>
    <p>user list</p>
    <UserItem v-for="user in users" :key="user.id" :user="user" />
  </div>
</template>

<script>
import UserItem from './UserItem.vue'

export default {
  components: {
    UserItem
  },
  props: {
    users: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>
