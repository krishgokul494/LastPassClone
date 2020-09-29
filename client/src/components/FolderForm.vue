<template>
  <v-form ref="form" class="pa-5">
    <label for="url">FOLDER NAME :</label>
    <v-text-field
      solo
      name="folderName"
      type="text"
      color="white"
      v-model="folderName"
    ></v-text-field>
    <v-row
      no-gutters
      cols="12"
    >
      <v-col class="text-center" cols="sm6">
        <!-- @click="overlay('closeOverlay')" -->
        <v-btn
          @click="toggleState({state: 'addFold'})"
          color="primary"
          :disabled="loading"
        >
          Cancel
        </v-btn>
      </v-col>
      <v-col class="text-center" cols="sm6">
        <v-btn
          @click="saveFolder"
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
      loading: false,
      folderName: ''
    }
  },
  methods: {
    toggleState (state) {
      this.$store.commit('toggleState', state)
    },
    async saveFolder () {
      this.loading = true
      await DataHandler.saveFolder({
        folder: this.folderName
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
        content: 'Folder Added',
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
