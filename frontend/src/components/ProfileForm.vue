<template>
  <p>profile form</p>
</template>

<script>
export default {
  props: {
    user: {
      types: Object,
      required: true,
      default: () => ({})
    }
  }
}
</script>
