<template>
  <v-container>
    <v-toolbar
      flat
    >
      <v-toolbar-title>
          All Items
      </v-toolbar-title>
      <v-spacer/>
    </v-toolbar>
    <ItemPanel/>
    <Dial/>
    <AddForms></AddForms>
  </v-container>
</template>

<script>
import Dial from '@/components/Dial'
import ItemPanel from '@/components/ItemPanel'
import AddForms from '@/components/AddForms'
export default {
  data () {
    return {
    }
  },
  computed: {
    urlParams () {
      var urlParams = new URLSearchParams(window.location.search)
      return urlParams
    },
    add () {
      console.log(this.urlParams.has('add'))
      return this.urlParams.has('add')
    }
    // ,
    // addPass () {
    //   return this.$store.state.addPass
    // },
    // addNote () {
    //   return this.$store.state.addNote
    // },
    // addFold () {
    //   return this.$store.state.addFold
    // }
  },
  methods: {
    toggleState (state) {
      this.$store.commit('toggleState', state)
    }
  },
  components: {
    Dial,
    ItemPanel,
    AddForms
  },
  mounted () {
    this.$store.dispatch('loadVault')
  }
}
</script>

<style>
  .v-overlay-content {
    min-width: 320px;
  }
</style>
