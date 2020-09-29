<template>
    <v-form ref="form" class="pa-5" disabled>
      <label for="url">URL :</label>
      <v-text-field
        solo
        name="url"
        type="text"
        color="white"
        v-model="formData.url"
      ></v-text-field>
      <v-row>
        <v-col cols="12" md="6">
          <label for="name">NAME :</label>
          <v-text-field
            solo
            name="name"
            type="text"
            v-model="formData.name"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <label for="folder">FOLDER :</label>
          <v-combobox
            solo
            name="folder"
            v-model="formData.folder"
            :items="folders"
            menu-props="auto"
          ></v-combobox>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <label for="username">USERNAME/ EMAIL :</label>
          <v-text-field
            solo
            name="username"
            type="text"
            v-model="formData.username"
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
            v-model="formData.password"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row
        no-gutters
        cols="12"
      >
        <v-col class="text-center" cols="sm6">
          <v-btn
            color="primary"
            :disabled="loading"
            @click="toggleState({state: 'addPass'})"
          >
            Cancel
          </v-btn>
        </v-col>
        <v-col class="text-center" cols="sm6">
          <v-btn
            color="primary"
            :disabled="loading"
            @click="savePassword"
          >
            Save
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
</template>

<script>
import DataHandler from '@/services/DataHandlers'
import encryption from '@/assets/encryption.js'
export default {
  data () {
    return {
      height: '0.5em',
      loading: false,
      show: false
    }
  },
  props: {
    formData: {
      type: Object
    }
  },
  methods: {
    toggleState (state) {
      this.$store.commit('toggleState', state)
    },
    async savePassword () {
      this.loading = true
      const encryptionkey = sessionStorage.getItem('encryptionKey')
      const encryptedpassword = await encryption.encryptData(this.formData.password, encryptionkey)
      if (this.formData.folder === '' || this.formData.folder === null) { this.formData.folder = 'General' }
      await DataHandler.savePassword({
        url: this.formData.url,
        name: this.formData.name,
        folder: this.formData.folder,
        username: this.formData.username,
        password: encryptedpassword
      }).then(() => {
        this.clearForm()
      }).catch(() => {
        console.log('save Password error')
      })
      this.loading = false
      this.$store.state.snackbar = {
        model: true,
        content: 'Password Added',
        color: '#00a8f3',
        timeout: 5000
      }
    },
    clearForm () {
      if (this.$refs.form) {
        this.$refs.form.reset()
      }
    }
  },
  computed: {
    passwordForm: {
      get () {
        return this.$store.state.addPassword
      },
      set () {
        return this.$store.state.addPassword
      }
    },
    folders () {
      return this.$store.state.folders
      // return [':General', 'A', 'Z']
      // Array.from(Array(this.$store.state.vaultData), (folder) => folder.folder_name)
    }
  },
  components: {
  }
}
</script>

<style>

</style>
