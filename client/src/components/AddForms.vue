<template>
  <v-dialog
    persistent
    :value="addPass || addFold || addNote"
    :fullscreen="$vuetify.breakpoint.smAndDown"
    class="pt-15"
    max-width="600px"
    absolute
  >
    <v-card
      color="white"
      light
      tile
    >
      <v-toolbar color="#00a8f3" dark>
        <v-btn icon class="ml-1" v-if="$vuetify.breakpoint.smAndDown">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="px-5">
          {{formTitle}}
        </v-toolbar-title>
        <!-- <v-spacer></v-spacer>
        <v-btn text class="mr-2">
          <v-icon class="pr-2">mdi-content-save</v-icon>Save
        </v-btn> -->
      </v-toolbar>
      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        top
        color="warning"
      ></v-progress-linear>
      <PasswordForm v-if="addPass" :formData="passFormData"/>
      <NoteForm v-else-if="addNote"/>
      <FolderForm v-else-if="addFold"/>
    </v-card>
  </v-dialog>
</template>

<script>
import LogoText from '@/components/LogoText'
import PasswordForm from '@/components/PasswordForm'
import NoteForm from '@/components/NoteForm'
import FolderForm from '@/components/FolderForm'
export default {
  data () {
    return {
      dialog: true,
      loading: false,
      passFormData: {
        url: '',
        name: '',
        folder: null,
        username: '',
        password: ''
      }
    }
  },
  computed: {
    formTitle () {
      return this.$store.state.formTitle
    },
    addPass () {
      return this.$store.state.addPass
    },
    addNote () {
      return this.$store.state.addNote
    },
    addFold () {
      return this.$store.state.addFold
    }
  },
  components: {
    LogoText,
    PasswordForm,
    NoteForm,
    FolderForm
  }
}
</script>

<style>

</style>
