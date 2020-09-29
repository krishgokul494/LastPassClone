<template>
  <div style="vertical-align: bottom">
    <v-speed-dial
      :absolute="$vuetify.breakpoint.mdAndUp"
      right
      bottom
      :open-on-hover="hover"
      v-model="fab"
      direction="top"
      class="mb-5 fixed"
      :class="{'mr-5': $vuetify.breakpoint.mdAndDown,'sidepad': $vuetify.breakpoint.lgAndUp}"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="#00a8f3"
          dark
          fab
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
        @click="toggleState({state: 'addFold', formTitle: 'Folder'})"
      >
        <v-icon>mdi-folder-plus</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
        @click="toggleState({state: 'addPass', formTitle: 'Password'})"
      >
        <v-icon>mdi-lock-plus</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
        @click="toggleState({state: 'addNote', formTitle: 'Note'})"
      >
        <v-icon>mdi-note-plus</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fab: false,
      hover: true
    }
  },
  methods: {
    toggleState (state) {
      this.$store.commit('toggleState', state)
    }
  },
  computed: {
    passwordForm: {
      get () {
        return this.$store.state.passwordForm
      },
      set () {
        return this.$store.state.passwordForm
      }
    }
  }
}
</script>

<style>
.fixed {
  position: fixed
}
.sidepad {
  margin-right: 20%;
}
</style>
