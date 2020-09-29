<template>
  <v-container
    class="fill-height"
    fluid
  >
    <!-- <link href="https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css" rel="stylesheet"> -->
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-alert
          :value="success"
          dense
          outlined
          type="success"
          center
        >
          Registration Success
        </v-alert>
        <v-card class="elevation-12 px-10 pb-3">
          <v-card-title
            class="justify-center"
          >
            <LogoText/>
          </v-card-title>
          <v-toolbar
          flat
          >
            <v-toolbar-title>
              CREATE ACCOUNT
            </v-toolbar-title>
            <v-spacer/>
            OR&nbsp;&nbsp;
            <v-toolbar-title>
              <router-link to="Login">
                LOGIN
              </router-link>
            </v-toolbar-title>
          </v-toolbar>

          <v-divider></v-divider>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Email address"
                name="email"
                type="text"
                hide-details: auto
                v-model="email"
              ></v-text-field>
              <v-text-field
                label="Master Password"
                name="masterpassword"
                type="password"
                v-model="masterpassword"
              ></v-text-field>
              <v-text-field
                label="Confirm Master Password"
                name="confirmmpwd"
                type="password"
                v-model="confirmmpwd"
              ></v-text-field>
              <v-text-field
                label="Remainder"
                name="remainder"
                type="text"
                v-model="remainder"
              ></v-text-field>
              <!-- <v-checkbox
                v-model="agree"
              >
                <template v-slot:label>
                      I Agree to the <router-link to="Tmc">Terms and Conditions</router-link>
                </template>
              </v-checkbox> -->
              <v-btn
                block
                rounded
                large
                color="primary"
                @click="register"
              >
                Create Account
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthenticationServices from '@/services/AuthenticationService'
import encrypt from '@/assets/encryption'
import LogoText from '@/components/LogoText'
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      masterpassword: '',
      confirmmpwd: '',
      remainder: '',
      success: true,
      error: null,
      agree: false
    }
  },
  methods: {
    async register () {
      try {
        var hashData = await encrypt.hashPassword(this.email, this.masterpassword)
        var hashConfirmData = await encrypt.hashPassword(this.email, this.confirmmpwd)
        // var createEncryptionKey = await encrypt.hashPassword(this.masterpassword)
        await AuthenticationServices.register({
          email: this.email,
          masterpassword: hashData,
          confirmmpwd: hashConfirmData,
          remainder: this.remainder
        })
        this.success = true
        this.$refs.form.reset()
      } catch (error) {
        const errors = error.response.data.error
        var errorMessages = ''
        // console.log(errors.errors)
        errors.forEach(error => {
          if (errorMessages !== '') {
            errorMessages += '\n'
          }
          errorMessages += error.msg
        })
        this.error = errorMessages
      }
    }
  },
  components: {
    LogoText
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
