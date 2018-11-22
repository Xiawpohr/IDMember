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
      <v-text-field
        v-model="coin"
        label="How much money?"
        type="number"
        suffix="Ether"
        outline
        single-line
        hide-details
      />
      <v-dialog v-model="dialog" max-width="290">
        <v-btn slot="activator" color="teal" flat>Transfer</v-btn>
        <v-card>
          <v-card-title class="headline">Use your wallet's private key! </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="privateKey"
              label="Private Key"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="teal darken-1" flat @click="dialog = false">Cancel</v-btn>
            <v-btn color="teal darken-1" flat @click="pay">Transfer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
  data() {
    return {
      coin: 0,
      privateKey: '',
      dialog: false
    }
  },
  methods: {
    pay() {
      this.$store.dispatch('crypto/sendCoin', {
        privateKey: this.provateKey,
        to: this.user.account,
        value: this.coin
      })
      this.coin = 0
      this.dialog = false
    }
  }
}
</script>
