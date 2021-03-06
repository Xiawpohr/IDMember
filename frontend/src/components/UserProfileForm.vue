<template>
  <v-form 
    ref="form"
    v-model="valid"
    @submit.prevent="submit"
  >
    <v-layout>
      <v-flex class="mr-2">
        <v-text-field
          v-model="account"
          outline
          color="teal"
          label="Your Etherium Account"
          append-outer-icon="search"
          @click:append-outer="getBalance"
        />
      </v-flex>
      <v-flex style="flex: 0 0 110px">
        <v-text-field
          v-model="balance"
          outline
          single-line
          readonly
          color="teal"
          suffix="Ether"
        />
      </v-flex>
    </v-layout>
    <v-text-field
      v-model="firstName"
      :rules="[rules.name]"
      label="First Name"
      color="teal"
      box
      required
    />
    <v-text-field
      v-model="lastName"
      :rules="[rules.name]"
      label="Last Name"
      color="teal"
      box
      required
    />
    <v-text-field
      v-model="email"
      :rules="[rules.email]"
      label="E-mail"
      color="teal"
      box
      required
    />
    <v-text-field
      v-model="phone"
      box
      color="teal"
      label="Phone number"
      mask="#### - ### - ###"
    />
    <v-textarea
      v-model="bio"
      auto-grow
      box
      color="teal"
      label="Bio"
      rows="2"
    />
    <v-radio-group v-model="gender" row>
      <v-radio label="Male" value="male" color="teal" />
      <v-radio label="Female" value="female" color="teal" />
    </v-radio-group>
    <v-menu
      ref="birthdayMenu"
      v-model="birthdayMenu"
      :close-on-content-click="false"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
    >
      <v-text-field
        slot="activator"
        v-model="birthday"
        label="Birthday date"
        color="teal"
        box
        readonly
      />
      <v-date-picker
        ref="picker"
        v-model="birthday"
        :max="new Date().toISOString().substr(0, 10)"
        min="1950-01-01"
        @change="setBirthday"
        color="teal"
        no-title
      />
    </v-menu>
    <div class="text-xs-center">
      <v-btn
        :disabled="!valid"
        type="submit"
        color="teal"
        large
        dark
      >
        Save
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { getBalance } from '@/eth.js'

export default {
  props: {
    user: {
      types: Object,
      default: () => ({
        account: '',
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
      account: this.user.account,
      balance: '',
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phone: this.user.phone,
      bio: this.user.bio,
      gender: this.user.gender,
      birthday: this.user.birthday,
      birthdayMenu: false,
      valid: true,
      rules: {
        name: v => !!v || 'Name is required',
        email: v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(v) || 'Please enter a valid email'
        },
        length: len => v =>
          (v || '').length >= len ||
          `Invalid character length, required ${len}`,
        password: v =>
          (v || '').match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
          ) ||
          'Password must contain an upper case letter, a numeric character, and a special character'
      }
    }
  },
  computed: {
    modifiedUser() {
      return {
        account: this.accuont,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        bio: this.bio,
        gender: this.gender,
        birthday: this.birthday
      }
    }
  },
  watch: {
    user(val) {
      this.account = val.account
      this.firstName = val.firstName
      this.lastName = val.lastName
      this.email = val.email
      this.phone = val.phone
      this.bio = val.bio
      this.gender = val.gender
      this.birthday = val.birthday
    },
    birthdayMenu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit('submitted', this.modifiedUser)
      }
    },
    setBirthday(date) {
      this.$refs.birthdayMenu.save(date)
    },
    async getBalance() {
      this.balance = await getBalance(this.account)
    }
  }
}
</script>
