<template>
  <p>{{user.name}}</p>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
      default: () => ({})
    }
  }
}
</script>
