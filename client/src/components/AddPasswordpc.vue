<template>
  <v-overlay
    :value="addPassword"
  >
    <v-card
      color="white"
      light
      justify="center"
      left
    >
      <v-system-bar
        color="#D0D3D4"
        height="height"
      >
        <span>Add Password</span>
        <v-spacer/>
        <LogoText/>
      </v-system-bar>
      <v-progress-linear
          :active="loading"
          :indeterminate="loading"
          top
          color="#00a8f3"
        ></v-progress-linear>
      <div>
      <v-form ref="form" class="pa-5">
        <label for="url">URL :</label>
        <v-text-field
          solo
          name="url"
          type="text"
          color="white"
          v-model="url"
        ></v-text-field>

        <v-row>
          <v-col cols="12" md="6">
            <label for="name">NAME :</label>
            <v-text-field
              solo
              name="name"
              type="text"
              v-model="name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <label for="folder">FOLDER :</label>
            <v-combobox
              solo
              name="folder"
              v-model="folder"
              :items="folders"
              menu-props="auto"
            ></v-combobox>
            <!-- <v-text-field
              solo
              name="folder"
              type="text"
              v-model="name"
            ></v-text-field> -->
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <label for="username">USERNAME/ EMAIL :</label>
            <v-text-field
              solo
              name="username"
              type="text"
              v-model="username"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <label for="password">PASSWORD :</label>
            <v-text-field
              solo
              name="password"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
              v-model="password"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row
          no-gutters
        >
          <v-col class="text-center" cols="12" sm="6">
            <v-btn
              @click="overlay('closeOverlay')"
              color="primary"
            >
              Cancel
            </v-btn>
          </v-col>
          <v-col class="text-center" cols="12" sm="6">
            <v-btn
              color="primary"
              @click="savePassword"
            >
              Save
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      </div>
    </v-card>
  </v-overlay>
</template>

<script>
import LogoText from '@/components/LogoText'
import DataHandler from '@/services/DataHandlers'
import encryption from '@/assets/encryption.js'
export default {
  data () {
    return {
      url: '',
      name: '',
      folder: null,
      username: '',
      password: '',
      height: '0.5em',
      folders: ['General', 'A', 'B', 'C'],
      loading: false,
      show: false
    }
  },
  components: {
    LogoText
  },
  methods: {
    async savePassword () {
      const encryptionkey = sessionStorage.getItem('encryptionKey')
      this.password = await encryption.encryptData(this.password, encryptionkey)
      if (this.folder === '') { this.folder = 'General' }
      await DataHandler.savePassword({
        url: this.url,
        name: this.name,
        folder: this.folder,
        username: this.username,
        password: this.password
      }).then(() => {
        this.clearForm()
      }).catch(() => {
        console.log('save Password error')
      })
    },
    clearForm () {
      if (this.$refs.form) {
        this.$refs.form.reset()
      }
    },
    overlay (payload) {
      this.$store.commit('overlay', payload)
    }
  },
  computed: {
    addPassword () {
      return this.$store.state.addPassword
    }
  },
  watch: {
    addPassword: 'clearForm'
  }
}
</script>

<style>
  .v-overlay__content {
    align-items: center;
    align-content: center;
    min-width: 50%;
  }
</style>
