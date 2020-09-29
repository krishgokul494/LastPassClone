<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="mini"
    :permanent="largescreen"
    :temperary="!largescreen"
    hide-overlay
    :app="largescreen"
  >
    <v-list dense>
      <v-list-item
        @click="navDrawerMini"
        :v-model="largescreen"
      >
        <v-list-item-avatar>
          <v-icon v-if="mini">
            mdi-chevron-right
          </v-icon>
          <v-icon v-else>
            mdi-chevron-left
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-content
          @click.stop="mini = !mini"
        >
          <v-list-item-title>
            CLOSE
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <br>
      <v-list-item-group
        active-class="white--text"
      >
        <v-list-item
          @click="open('home')"
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
        <br/>
        <v-list-item
          @click="open('password')"
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
          @click="open('password')"
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
          @click="open('password')"
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
          @click="open('password')"
        >
          <v-list-item-avatar>
            <v-icon>
              mdi-settings
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              SETTINGS
            </v-list-item-title>
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
    logged () {
      return this.$store.state['logged']
    },
    home () {
      return this.$store.state['home']
    },
    password () {
      return this.$store.state['password']
    },
    largescreen () {
      return this.$screen.width > 910
    },
    drawer () {
      return this.$store.state.drawer
    },
    mini () {
      return this.largescreen?this.$store.state.mini:false
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
</style>
