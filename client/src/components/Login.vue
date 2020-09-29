<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card class="elevation-12 px-10">
          <v-card-title
            class="justify-center"
          >
            <LogoText/>
          </v-card-title>
          <v-toolbar
            flat
          >
            <v-toolbar-title>
              LOGIN
            </v-toolbar-title>
            <v-spacer/>
            OR&nbsp;&nbsp;
            <v-toolbar-title>
              <router-link to="Register">
                CREATE AN ACCOUNT
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
                v-model="email"
              ></v-text-field>
              <v-text-field
                label="Master Password"
                name="masterpassword"
                type="password"
                v-model="masterpassword"
              ></v-text-field>
              <v-btn
                block
                rounded
                large
                color="primary"
                @click="login"
              >
                Login
              </v-btn>
              <v-list-item
                class="justify-center"
              >
                <router-link
                  to="Forget Password"
                >
                  FORGET PASSWORD?
                </router-link>
              </v-list-item>
              <v-list-item>
                Remember Email<v-spacer></v-spacer><v-switch></v-switch>
              </v-list-item>
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
  name: 'Login',
  data () {
    return {
      email: '',
      masterpassword: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        var hashData = await encrypt.hashPassword(this.email, this.masterpassword)
        var response = await AuthenticationServices.login({
          email: this.email,
          masterpassword: hashData
        })

        var encryptionSalt = response.data.encryptionSalt
        await sessionStorage.setItem('encryptionKey', encrypt.hashPassword(encryptionSalt, this.masterpassword))
        sessionStorage.setItem('email', response.data.email)
        this.$store.state.logged = true
        this.$router.push({name: 'Vault'})
        console.log(response)
      } catch (error) {
        console.log(error.response.data)
        this.error = error.response.data.error
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
/* a {
  color: #00a8f3;
  text-decoration: none;
} */
</style>
