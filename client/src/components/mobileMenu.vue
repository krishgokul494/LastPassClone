<template>
  <v-bottom-sheet v-model="sheets">
    <template v-slot:activator="{ on, attrs }">
      <v-toolbar row cols="12" v-bind="attrs" v-on="on" v-if="type == 'password'">
        <v-col cols="1">
          <v-icon :small="$vuetify.breakpoint.smAndDown" class="pl-0">mdi-lock</v-icon>
        </v-col>
        <v-col cols="11">
          <v-toolbar-title style="overflow: hide">
            <v-list class="pa-0">
              <v-list-item-title>{{password.name}}</v-list-item-title>
              <v-list-item-subtitle>{{password.userName}}</v-list-item-subtitle>
            </v-list>
          </v-toolbar-title>
        </v-col>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-toolbar row cols="12" v-bind="attrs" v-on="on" v-else-if="type == 'note'">
        <v-col cols="1">
          <v-icon :small="$vuetify.breakpoint.smAndDown" class="pl-0">mdi-note</v-icon>
          </v-col>
          <v-col cols="11">
            <v-toolbar-title>
              <v-list class="pa-0">
                <v-list-item-title>{{note.name}}</v-list-item-title>
                <!-- <v-list-item-subtitle>{{password.userName}}</v-list-item-subtitle> -->
              </v-list>
            </v-toolbar-title>
          </v-col>
          <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <v-list @click="!sheets" class="pl-4">
      <v-subheader v-if="type == 'password'">{{password.name}}</v-subheader>
      <v-subheader v-else-if="type == 'note'">{{note.name}}</v-subheader>
      <!-- v-if="$vuetify.breakpoint.smAndDown" -->
      <Options v-bind:item="password" v-bind:type="type"></Options>
      <!-- <v-layout :class="{'list': $vuetify.breakpoint.smAndDown}" row>
      <v-list-item :href="password.url" target="_blank" @click="!sheets" v-if="type == 'password'">
        <v-list-item-avatar>
          <v-tooltip
            bottom
          >
            <template v-slot:activator="{on, attrs}">
              <v-icon
                v-bind="attrs"
                v-on="on"
              >
                mdi-rocket-launch
              </v-icon>
            </template>
            <span>Launch</span>
          </v-tooltip>
        </v-list-item-avatar>
        <v-list-item-title>Launch</v-list-item-title>
      </v-list-item>
      <v-list-item @click="copyUsername(password.userName)" v-if="type == 'password'">
        <v-list-item-avatar>
          <v-tooltip
            bottom
          >
            <template v-slot:activator="{on, attrs}">
              <v-icon
                v-bind="attrs"
                v-on="on"
              >
                mdi-content-copy
              </v-icon>
            </template>
            <span>Copy Username</span>
          </v-tooltip>
        </v-list-item-avatar>
        <v-list-item-title>Copy Usename</v-list-item-title>
      </v-list-item>
      <v-list-item @click="copyPassword(password.id)" v-if="type == 'password'">
        <v-list-item-avatar>
          <v-tooltip
            bottom
          >
            <template v-slot:activator="{on, attrs}">
              <v-icon
                v-bind="attrs"
                v-on="on"
              >
                mdi-content-copy
              </v-icon>
            </template>
            <span>Copy Password</span>
          </v-tooltip>
        </v-list-item-avatar>
        <v-list-item-title>Copy Password</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-avatar>
          <v-tooltip
            bottom
          >
            <template v-slot:activator="{on, attrs}">
              <v-icon
                v-bind="attrs"
                v-on="on"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>Edit</span>
          </v-tooltip>
        </v-list-item-avatar>
        <v-list-item-title>Edit</v-list-item-title>
      </v-list-item>
      </v-layout> -->
    </v-list>
  </v-bottom-sheet>
</template>

<script>
import DataHandlers from '@/services/DataHandlers'
import encryption from '@/assets/encryption'
import Options from '@/components/Options'
export default {
  data () {
    return {
      sheets: false
    }
  },
  props: {
    password: {
      type: Object
    },
    type: {
      type: String
    },
    note: {
      type: Object
    }
  },
  methods: {
    copyUsername (username) {
      navigator.clipboard.writeText(username)
        .then(() => {
          this.sheets = false
          this.$store.state.snackbar = {
            model: true,
            color: '#00a8f3',
            content: 'Username copied to clipboard',
            timeout: 5000
          }
        }).catch((error) => {
          console.log(error)
        })
    },
    async copyPassword (passwordId) {
      var password = null
      await DataHandlers.getPassword({passwordid: passwordId})
        .then((encryptedPassword) => {
          this.sheets = false
          password = encryptedPassword.data.encryptedPassword
        })
        .catch((error) => {
          console.log(error)
        })
      console.log(password)
      var key = sessionStorage.getItem('encryptionKey')
      password = await encryption.decryptData(password, key)
      console.log(password)
      navigator.clipboard.writeText(password)
        .then(() => {
          this.$store.state.snackbar = {
            model: true,
            color: '#00a8f3',
            content: 'Password copied to clipboard',
            timeout: 5000
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  components: {
    Options
  }
}
</script>

<style>

</style>
