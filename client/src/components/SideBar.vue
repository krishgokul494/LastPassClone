<template>
  <v-navigation-drawer
    clipped
    v-model="$vuetify.breakpoint.lgAndUp"
    hide-overlay
    app
    right
    :permanent="$vuetify.breakpoint.lgAndUp"
    mobileBreakpoint=1264
    class="hidden-sm-and-down"
  >
  <!-- {{mini}} -->
    <v-card class="ma-2">
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="item in [{'name':'Password', 'count': counts.passwordcount}, {'name':'Notes', 'count':counts.notecount}, {'name':'Cards', 'count':counts.cardcount}]"
            :key="item.name"
            disabled
          >
            <v-subheader>
              {{item.name}} :
              <v-chip
                class="ml-5"
                color="#00a8f3"
                text-color= "white"
                small
                draggable
              >
                {{item.count}}
              </v-chip>
            </v-subheader>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import LogoText from '@/components/LogoText'
export default {
  name: 'SideBar',
  data () {
    return {
      sidebar: true
    }
  },
  methods: {
    open (payload) {
      this.$store.commit('open', payload)
    },
    getCount () {
      this.$store.dispatch('getCount')
    }
  },
  computed: {
    // sidebar: {
    //   set () {

    //   },
    //   get () {
    //     // return this.$screen.width > 769
    //     return true
    //   }
    // },
    counts () {
      return {
        passwordcount: this.$store.state.passwordcount,
        notecount: this.$store.state.notecount,
        cardcount: this.$store.state.cardcount
      }
    },
    logged () {
      return this.$store.state['logged']
    },
    home () {
      return this.$store.state['home']
    },
    password () {
      return this.$store.state['password']
    }
  },
  components: {
    LogoText
  },
  watch: {
    counts () {
      return {
        passwordcount: this.$store.state.passwordcount
      }
    }
  },
  mounted () {
    this.getCount()
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
