<template>
  <p>user list</p>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>
