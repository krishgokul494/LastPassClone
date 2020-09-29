<template>
  <v-container fluid id="vault">
    <!-- <v-row cols="12" class="fill-height"> -->
      <!-- <v-col sm="12"> -->
        <Home
          v-show="home"
        ></Home>
        <Password
          v-show="password"
        >
        </Password>
        <AddPassword/>
        <div style="vertical-align: bottom">
        <v-speed-dial
          absolute
          right
          bottom
          :open-on-hover="hover"
          v-model="fab"
          direction="top"
          class="mr-5 mb-5 fixed"
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
          >
            <v-icon>mdi-folder-plus</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            small
            color="indigo"
            @click="overlay('addPassword')"
          >
            <v-icon>mdi-lock</v-icon>
          </v-btn>
        </v-speed-dial>
        </div>
      <!-- </v-col> -->
    <!-- </v-row> -->
    <!-- <SideBar :count="count"/> -->
  </v-container>
</template>

<script>
import encrypt from '@/assets/encryption'
import AddPassword from '@/components/AddPassword'
import Home from '@/components/Home'
import Password from '@/components/Password'
import SideBar from '@/components/SideBar'
export default {
  name: 'Vault',
  data () {
    return {
      success: false,
      error: null,
      logged: true,
      fab: false,
      top: false,
      bottom: true,
      right: true,
      left: false,
      hover: true,
    }
  },
  methods: {
    overlay (payload) {
      console.log(payload)
      this.$store.commit('overlay', payload)
    },
    loadVault () {
      this.$store.dispatch('loadVault')
    }
  },
  computed: {
    home () {
      return this.$store.state.home
    },
    password () {
      return this.$store.state.password
    },
    count () {
      return {
        passwordcount: this.$store.state.passwordcount
      }
    }
  },
  components: {
    Home,
    AddPassword,
    Password,
    SideBar
  },
  mounted () {
    this.$store.dispatch('loadVault')
  },
  created () {
    this.$store.dispatch('getCount')
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
a {
  color: #42b983;
}
.fixed {
  position: fixed
}
</style>
