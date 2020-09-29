<template>
  <div id="workarea">
    <v-toolbar
      flat
    >
        <v-toolbar-title>
            All Items
        </v-toolbar-title>
        <v-spacer/>
    </v-toolbar>
    <v-expansion-panels
      v-if="vaultData"
      :class="{'px-15': largescreen}"
      width="100%"
      v-model="open"
      multiple
      :disabled="largescreen?false:true"
    >
      <v-snackbar
        v-model="snackbar"
        top
        :color="color"
        :timeout="timeout"
        class="pt-16"
      >
        {{ snackbartext }}

        <template v-slot:action="{ attrs }">
          <v-btn
            dark
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <v-expansion-panel
        v-for="(folder, i) in vaultData"
        :key="folder.id"
        :disabled="!folder.Passwords.length"
        :expand="true"
        multiple
      >
        <v-expansion-panel-header>
            <div>
                <v-icon class="mr-10">mdi-folder-outline</v-icon>
                  {{folder.folder_name}}
              <v-chip
                text-color="white"
                color="#00a8f3"
                small
                class="ml-3"
              >
                <b>{{folder.Passwords.length? folder.Passwords.length : '0'}}</b>
              </v-chip>
            </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content
          v-for="(password, j) in folder.Passwords"
          :key="j"
        >
          <v-toolbar class="row-12">
            <div class="col-1"><v-icon color="#00a8f3" dark>mdi-lock</v-icon></div>
            <div class="ma-0 pa-0" :class="{'col-5':largescreen, 'col-10': !largescreen}">
              <v-toolbar-title class="ml-5">
                <v-list class="pa-0">
                  <v-list-item-title>{{password.name}}</v-list-item-title>
                  <v-list-item-subtitle>{{password.userName}}</v-list-item-subtitle>
                </v-list>
              </v-toolbar-title>
            </div>
            <div class="ma-0 pa-0" :class="{'col-6': largescreen, 'col-1': !largescreen}" style="display: contents">
            <v-subheader v-show="largescreen" class="ma-0 pa-0 mr-0" style="width:fit-content;">
              Last used: never
            </v-subheader>
            <v-spacer></v-spacer>
            <div v-show="largescreen">
            <v-btn
              fab
              icon
              :href="password.url"
              target="x"
            >
              <v-icon>mdi-rocket</v-icon>
            </v-btn>

            <v-menu
              offset-y
            >
              <template v-slot:activator="{ on: menu, attrs }">
                <v-tooltip
                  bottom
                >
                  <template v-slot:activator="{on: tooltip}">
                    <v-btn
                      icon
                      fab
                      v-bind="attrs"
                      v-on="{ ...tooltip, ...menu}"
                    >
                      <v-icon>mdi-content-copy</v-icon>
                    </v-btn>
                  </template>
                  <span>copy</span>
                </v-tooltip>
              </template>
              <v-list class="pa-0">
                <v-list-item
                  v-for="(item, index) in [{'title':'copy username', 'action':copyusername}, {'title':'copy password', 'action':copypassword}]"
                  :key="index"
                  class="pa-0"
                >
                  <v-btn
                    text
                    @click="(item.action({id: password.id, username: password.userName}))"
                    class="py-1"
                  >
                    {{item.title}}
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-tooltip
              bottom
              v-for="(btn) in [{'icon':'mdi-pencil','tooltip':'Edit', 'clicked':'edit'},{'icon':'mdi-delete','tooltip':'Delete','clicked':confirmdelete}]"
              :key="btn.tooltip"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  fab
                  v-bind="attrs"
                  v-on="on"
                  @click="btn.clicked(i, j, 'Passwords')"
                >
                  <v-icon>{{btn.icon}}</v-icon>
                </v-btn>
              </template>
              <span>{{btn.tooltip}}</span>
            </v-tooltip>
            </div>
            <v-icon v-show="!largescreen">mdi-dots-horizontal</v-icon>
            </div>
          </v-toolbar>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-dialog
      v-model="dialog.model"
      width="30%"
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
            @click="dialog.action(dialog.itemId, dialog.type, dialog.folder)"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DataHandlers from '@/services/DataHandlers'
import encryption from '@/assets/encryption'
export default {
  data () {
    return {
      color: '#00a8f3',
      snackbar: false,
      snackbartext: '',
      timeout: 5000,
      fab: false,
      top: false,
      bottom: true,
      right: true,
      left: true,
      hover: true,
      event: null,
      eventdata: false,
      dialog: {
        model: false,
        title: null,
        text: null,
        action: null,
        folder: null,
        item: null
      },
      panel: true,
      // open: true
      // Array.from(Array(this.$store.state.vaultData.length), (_, index) => index)
    }
  },
  methods: {
    confirmdelete (folder, item, type) {
      console.log(folder, item)
      var data = this.vaultData[folder][type][item]
      this.dialog = {
        title: 'Delete Item',
        message: 'Are you sure you want to delete ' + data.name + ' ?',
        action: this.deleteItem,
        model: true,
        itemId: data.id,
        folder: folder,
        type: type
      }
    },
    copyusername (data) {
      navigator.clipboard.writeText(data.username)
        .then(() => {
          this.snackbartext = 'Username copied to clipboard'
          this.snackbar = true
        }).catch((error) => {
          console.log(error)
        })
    },
    async copypassword (item) {
      var password = null
      await DataHandlers.getPassword({passwordid: item.id})
        .then((encryptedPassword) => {
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
        this.snackbartext = 'Password copied to clipboard'
        this.snackbar = true
      }).catch((error) => {
        console.log(error)
      })
    },
    async deleteItem (itemid, itemtype, folder) {
      await this.$store.dispatch('deleteItem', {itemid, itemtype, folder})
        .then(() => {
          this.dialog = {
            model: false
          }
          this.snackbartext = 'Item deletion success'
          this.snackbar = true
        })
    }
  },
  computed: {
    largescreen () {
      return this.$screen.width > 910
    },
    vaultData () {
      return this.$store.state.vaultData
    },
    open: {
      get (){
        return this.$screen.width > 910 ? true : Array.from(Array(this.$store.state.vaultData.length), (_, index) => index)
      },
      set () {
        return this.$screen.width > 910 ? true : Array.from(Array(this.$store.state.vaultData.length), (_, index) => index)
      }
    },
    diabled () {
      // return this.largescreen ? true : 
    }
  }
}
</script>

<style scoped>

</style>
