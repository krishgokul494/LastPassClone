<template>
  <v-app-bar
    color="white"
    app
    clipped-right
  >
    <v-btn icon v-show="!largescreen" @click="navDrawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-toolbar-title><LogoText/></v-toolbar-title>
    <v-spacer></v-spacer>
    <nav
      v-if="!logged"
    >
        <router-link to="Register">
          <v-btn
            text
          >
            Register
          </v-btn>
        </router-link>
        <router-link to="Login">
          <v-btn
            text
          >
            Login
          </v-btn>
        </router-link>
    </nav>
    <nav
        v-else
      >
        <v-btn
            @click="logout"
            text
        >Logout
        </v-btn>
      </nav>
  </v-app-bar>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import LogoText from '@/components/LogoText'
import NavigationDrawer from '@/components/NavigationDrawer'
export default {
  methods: {
    async logout () {
      try {
        var loggedOut = AuthenticationService.logout()
        if (loggedOut) {
          this.$store.state.logged = false
          window.location.replace('./')
        }
      } catch (error) {
        console.log(error)
      }
    },
    navDrawer () {
      this.$store.commit('navDrawer')
    }
  },
  computed: {
    logged () {
      return this.$store.state.logged
    },
    largescreen () {
      return this.$screen.width > 910
    }
  },
  components: {
    LogoText
  }
}
</script>

<style scoped>

</style>
