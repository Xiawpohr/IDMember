<template>
  <v-card>
    <v-card-title>
      <v-flex class="pa-0 headline text-xs-center">
        {{user.firstName}} {{user.lastName}}
      </v-flex>
    </v-card-title>
    <v-list dense>
      <v-list-tile>
        <v-list-tile-content>
          <div class="subheading">{{user.email}}</div>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <div class="subheading">{{user.phone}}</div>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <div class="subheading">{{user.birthday}}</div>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <div class="subheading">{{user.gender}}</div>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <div
        v-if="isRequestedFriend"
        class="pa-2 body-2 cyan--text"
      >
        You have made a request.
      </div>
      <v-btn
        v-else-if="isWaitingForConfirmingFriend"
        @click="confirmFriend"
        flat
        color="teal"
      >
        Confirm
      </v-btn>
      <v-btn
        v-else
        @click="makeFriend"
        flat
        color="teal"
      >
        Make friend
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
      default: () => ({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        bio: '',
        gender: '',
        birthday: ''
      })
    }
  },
  computed: {
    isRequestedFriend() {
      return this.$store.getters['friend/isRequestedFriend'](this.user.id)
    },
    isWaitingForConfirmingFriend() {
      return this.$store.getters['friend/isWaitingForConfirmingFriend'](
        this.user.id
      )
    }
  },
  methods: {
    makeFriend() {
      this.$store.dispatch('friend/request', this.user.id)
    },
    confirmFriend() {}
  }
}
</script>
