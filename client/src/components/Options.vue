<template>
  <v-layout :class="{'list': $vuetify.breakpoint.smAndDown}" :row="$vuetify.breakpoint.smAndDown">
    <v-list-item :href="item.url" target="_blank" @click="!sheets" v-if="type == 'passwords'">
      <!-- <v-list-item-avatar> -->
        <v-tooltip
          bottom
        >
          <template v-slot:activator="{on, attrs}">
            <v-btn
              icon
              fab
            >
              <v-icon
                v-bind="attrs"
                v-on="on"
              >
                mdi-rocket-launch
              </v-icon>
            </v-btn>
          </template>
          <span>Launch</span>
        </v-tooltip>
      <!-- </v-list-item-avatar> -->
      <v-list-item-title v-if="$vuetify.breakpoint.smAndDown">Launch</v-list-item-title>
    </v-list-item>
    <!-- <v-list-item @click="copyUsername(item.userName)" v-if="type == 'password'">
        <v-tooltip
          bottom
        >
          <template v-slot:activator="{on, attrs}">
            <v-badge icon="mdi-account-outline" overlap bottom color="#656a70">
              <v-icon
                v-bind="attrs"
                v-on="on"
              >
                mdi-content-copy
              </v-icon>
            </v-badge>
          </template>
          <span>Copy Username</span>
        </v-tooltip>
      <v-list-item-title v-if="$vuetify.breakpoint.smAndDown">Copy Usename</v-list-item-title>
    </v-list-item>
    <v-list-item @click="copyPassword(item.id)" v-if="type == 'password'">
        <v-tooltip
          bottom
        >
          <template v-slot:activator="{on, attrs}">
            <v-badge icon="mdi-lock-outline" overlap bottom color="#656a70">
            <v-icon
              v-bind="attrs"
              v-on="on"
              light
            >
              mdi-content-copy
            </v-icon>
            </v-badge>
          </template>
          <span>Copy Password</span>
        </v-tooltip>
      <v-list-item-title v-if="$vuetify.breakpoint.smAndDown">Copy Password</v-list-item-title>
    </v-list-item> -->
    <v-menu
      offset-y
      v-if="type == 'passwords'"
    >
      <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip
          bottom
        >
          <template v-slot:activator="{on: tooltip}">
            <v-list-item
              v-bind="attrs"
              v-on="menu"
            >
            <v-btn
              icon
              fab
              v-on="tooltip"
            >
              <v-icon>mdi-content-copy</v-icon>
            </v-btn>
            <v-list-item-title v-if="$vuetify.breakpoint.smAndDown">Copy</v-list-item-title>
            </v-list-item>
          </template>
          <span>copy</span>
        </v-tooltip>
      </template>
      <v-list class="pa-0">
        <v-list-item>
          <v-btn
            text
            @click="copyUsername(item.userName)"
            class="py-1"
          >
            <v-icon class="mr-2">
              mdi-account-outline
            </v-icon>
            Copy userName
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn
            text
            @click="copyPassword(item.id)"
            class="py-1"
          >
            <v-icon class="mr-2">
              mdi-lock
            </v-icon>
            Copy Password
          </v-btn>
        </v-list-item>
        <!-- <v-list-item
          v-for="(item, index) in [{'title':'copy username', 'action':copyusername}, {'title':'copy password', 'action':copypassword}]"
          :key="index"
          class="pa-0"
        >
          <v-btn
            text
            @click="(item.action({id: item.id, username: item.userName}))"
            class="py-1"
          >
            {{item.title}}
          </v-btn>
        </v-list-item> -->
      </v-list>
    </v-menu>

    <v-list-item>
      <!-- <v-list-item-avatar> -->
        <v-btn icon fab align="center">
        <v-tooltip
          bottom
        >
          <template v-slot:activator="{on, attrs}">
            <v-icon
              v-bind="attrs"
              v-on="on"
            >
              mdi-book-open
            </v-icon>
          </template>
          <span>Open</span>
        </v-tooltip>
        </v-btn>
      <!-- </v-list-item-avatar> -->
      <v-list-item-title v-if="$vuetify.breakpoint.smAndDown">Open</v-list-item-title>
    </v-list-item>
    <v-list-item>
      <!-- <v-list-item-avatar> -->
        <v-btn icon fab >
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
        </v-btn>
      <!-- </v-list-item-avatar> -->
      <v-list-item-title v-if="$vuetify.breakpoint.smAndDown">Edit</v-list-item-title>
    </v-list-item>
    <v-list-item @click="confirmdelete(item.id, item.name, folderIndex, type)">
      <!-- <v-list-item-avatar> -->
        <v-btn icon fab align="center">
        <v-tooltip
          bottom
        >
          <template v-slot:activator="{on, attrs}">
            <v-icon
              v-bind="attrs"
              v-on="on"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>Delete</span>
        </v-tooltip>
        </v-btn>
      <!-- </v-list-item-avatar> -->
      <v-list-item-title v-if="$vuetify.breakpoint.smAndDown">Delete</v-list-item-title>
    </v-list-item>
    <v-dialog
      v-model="dialog.model"
      max-width = "500"
    >
      <v-card>
        <v-card-title class="headline" style="background-color:#00a8f3; color:white">{{dialog.title}}</v-card-title>

        <v-card-text class="pa-3" style=""><h3>{{dialog.message}}</h3></v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="#00a8f3"
            text
            @click="dialog.model = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="error"
            text
            @click="dialog.action(dialog.itemId, dialog.type, dialog.folderIndex)"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import DataHandlers from '@/services/DataHandlers'
import encryption from '@/assets/encryption'
export default {
  data () {
    return {
      dialog: {
        model: false,
        title: null,
        text: null,
        action: null,
        folder: null,
        item: null
      },
      sheets: false
    }
  },
  props: {
    item: {
      type: Object
    },
    type: {
      type: String
    },
    folderIndex: {
      type: Number
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
          console.log(encryptedPassword)
          password = encryptedPassword.data.encryptedPassword
        })
        .catch((error) => {
          console.log(error)
        })
      console.log(password)
      var key = sessionStorage.getItem('encryptionKey')
      console.log(key)
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
    },
    async deleteItem (itemid, itemtype, folderIndex) {
      await this.$store.dispatch('deleteItem', {itemid, itemtype, folderIndex})
        .then(() => {
          this.dialog = {
            model: false
          }
          console.log('b')
          this.$store.state.snackbar = {
            model: true,
            content: "Item Deleted successfully",
            color: "#00a8f3",
            timeout: 5000
          }
        })
    },
    confirmdelete (id, name, folderIndex, type) {
      this.dialog = {
        title: 'Delete Item',
        message: 'Are you sure you want to delete ' + name + ' ?',
        action: this.deleteItem,
        model: true,
        itemId: id,
        type: type,
        folderIndex: folderIndex
      }
    }
  }
}
</script>

<style scoped>
  .v-list-item {
    padding: 0
  }
</style>
