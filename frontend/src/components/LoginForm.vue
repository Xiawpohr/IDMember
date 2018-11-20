<template>
  <v-card width="450">
    <v-container>
      <h2 class="display-2 text-xs-center pb-4">Log In</h2>
      <v-form
        v-model="valid"
        @submit.prevent="$emit('submitted', auth)"
      >
        <v-text-field
          v-model="email"
          :rules="[rules.email]"
          label="E-mail"
          color="teal"
          box
          required
        />
        <v-text-field
          v-model="password"
          :rules="[rules.password]"
          label="Password"
          color="teal"
          type="password"
          box
          required
        />
        <div class="text-xs-center">
          <v-btn
            type="submit"
            color="teal"
            large
          >
            Log In
          </v-btn>
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      valid: false,
      rules: {
        email: v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(v) || 'Please enter a valid email'
        },
        password: v => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
          return pattern.test(v) || 'Password must contain an upper case letter, a numeric character, and a special character'
        }
      }
    }
  },
  computed: {
    auth() {
      return {
        email: this.email,
        password: this.password
      }
    }
  }
}
</script>
