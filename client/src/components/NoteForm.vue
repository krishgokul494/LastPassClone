<template>
  <v-form class="pa-5" style="height: inherit" ref="form">
    <v-row cols="12" >
    <v-col cols="12" md="5">
      <label for="name">NAME :</label>
      <v-text-field
        solo
        name="name"
        type="text"
        v-model="name"
      ></v-text-field>
      <label for="folder">FOLDER :</label>
      <v-combobox
        solo
        name="folder"
        v-model="folder"
        :items="folders"
        menu-props="auto"
      ></v-combobox>
    </v-col>
    <v-col cols="12" md="7">
      <label for="note">NOTE :</label>
      <v-textarea
        solo
        name="note"
        v-model="note"
      ></v-textarea>
    </v-col>
    </v-row>
    <v-row
      no-gutters
      cols="12"
    >
      <v-col class="text-center" cols="sm6">
        <!-- @click="overlay('closeOverlay')" -->
        <v-btn
          @click="toggleState({state: 'addNote'})"
          color="primary"
          :disabled="loading"
        >
          Cancel
        </v-btn>
      </v-col>
      <v-col class="text-center" cols="sm6">
        <v-btn
          @click="saveNote"
          color="primary"
          :disabled="loading"
        >
          Save
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import DataHandler from '@/services/DataHandlers'
export default {
  data () {
    return {
      name: null,
      folder: null,
      note: null,
      folders: this.$store.state.folders,
      loading: false
    }
  },
  methods: {
    toggleState (state) {
      this.$store.commit('toggleState', state)
    },
    async saveNote () {
      this.loading = true
      await DataHandler.saveNote({
        name: this.name,
        folder: this.folder,
        note: this.note
      })
        .then(() => {
          this.clearForm()
        })
        .catch((error) => {
          console.log(error)
        })
      this.loading = false
      this.$store.state.snackbar = {
        model: true,
        content: 'Note Added',
        color: '#00a8f3',
        timeout: 5000
      }
    },
    clearForm () {
      if (this.$refs.form) {
        this.$refs.form.reset()
      }
    }
  }
}
</script>

<style>

</style>
