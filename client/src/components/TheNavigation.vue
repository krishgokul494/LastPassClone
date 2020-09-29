<template>
  <v-app-bar
    color="white"
    clipped-left
    clipped-right
    app
  >
    <v-app-bar-nav-icon @click="navDrawer" class="hidden-md-and-up pl-4"></v-app-bar-nav-icon>
    <v-spacer class="hidden-md-and-up" ></v-spacer>
    <v-toolbar-title class="pa-0 px-2"><LogoText/></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon v-if="logged" class="mr-2">
    </v-btn>
    <nav class="hidden-sm-and-down ma-2" v-if="logged">
      <v-btn
        color="#00a8f3"
        dark
        @click="logout"
        v-text="'logout'"
      >
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </nav>
    <nav class="hidden-sm-and-down" v-else>
        <!-- <router-link to="Register"> -->
          <v-btn
            text
            to="Register"
          >
            Register
          </v-btn>
        <!-- </router-link> -->
        <router-link to="Login" exact>
          <v-btn
            text
          >
            Login
          </v-btn>
        </router-link>
    </nav>
    <!-- <nav
      v-else
    >
      <v-btn
          @click="logout"
          text
      >Logout
      </v-btn>
    </nav> -->
  </v-app-bar>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import LogoText from '@/components/LogoText'
export default {
  data () {
    return {
    }
  },
  methods: {
    async logout () {
      try {
        var loggedOut = AuthenticationService.logout()
        if (loggedOut) {
          this.$store.state.logged = false
          sessionStorage.clear()
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
    logged: {
      get () {
        return this.$store.state.logged
      },
      set () {
        return this.$store.state.logged
      }
    }
  },
  components: {
    LogoText
  }
}
</script>

<style scoped>

</style>
