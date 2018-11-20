<template>
  <v-container fluid grid-list-lg>
    <v-data-iterator
        :items="users"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
        content-tag="v-layout"
        row
        wrap
    >
      <v-flex
        slot="item"
        slot-scope="props"
        xs12
        sm6
        md4
        lg3
      >
        <UserItem :user="props.item" />
      </v-flex>
    </v-data-iterator>
  </v-container>
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
  },
  data() {
    return {
      rowsPerPageItems: [8, 12, 16],
      pagination: {
        rowsPerPage: 8
      },
    }
  }
}
</script>
