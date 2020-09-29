<template>
  <v-navigation-drawer
    v-model="drawer"
    clipped
    app
    :permanent="$vuetify.breakpoint.mdAndUp"
    mobileBreakpoint=960
    v-if="logged"
  >
    <v-list v-if="logged">
      <v-list-item class="px-2" two-line>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
        <v-list-item-title>John Leider</v-list-item-title>
        <v-list-item-subtitle>{{email}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item-group
        active-class="white--text"
      >
        <v-list-item
          to="/vault"
          exact
        >
          <v-list-item-avatar>
            <v-icon>
              mdi-home
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              HOME
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{name: 'Vault', query:{item: 'pass'}}"
          exact
        >
          <v-list-item-avatar>
            <v-icon>
              mdi-lock
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              PASSWORDS
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{name: 'Vault', query: {item: 'note'}}"
          exact
        >
          <v-list-item-avatar>
            <v-icon>
              mdi-note
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              NOTES
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{name: 'Vault', query: {item: 'card'}}"
          exact
        >
          <v-list-item-avatar>
            <v-icon>
              mdi-credit-card
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              CARDS
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          to="settings"
          exact
        >
          <v-list-item-avatar>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              SETTINGS
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-list v-else>
      <v-list-item-group>
        <v-list-item to="login">
          <v-list-item-avatar>
            <v-icon>mdi-login-variant</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="about" exact>
          <v-list-item-avatar>
            <v-icon>mdi-information</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import LogoText from '@/components/LogoText'
// import store from '@/store/store'
export default {
  name: 'Header',
  data () {
    return {
    }
  },
  props: {
    title: String
  },
  methods: {
    open (payload) {
      this.$store.commit('open', payload)
    },
    navDrawerMini () {
      this.$store.commit('navDrawerMini')
    }
  },
  computed: {
    email () {
      return sessionStorage.getItem('email')
    },
    drawer: {
      get () {
        return this.$store.state.drawer
      },
      set () {
        return this.$store.state.drawer
      }
    },
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
  },
  watch: {
  }
}
</script>

<style>
  .v-icon.v-icon {
    justify-content: left;
  }
  .v-list-item--active {
    background-color: #00a8f3;
  }
  .user_detail {
    background-color: #00a8f3;
    color: white;
    padding: clamp(50px, 6vw, 100px);
  }
</style>
