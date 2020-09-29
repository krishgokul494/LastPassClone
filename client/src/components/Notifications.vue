<template>
  <v-snackbar
    v-model="snackbar.model"
    top
    :color="snackbar.color"
    :timeout="snackbar.timeout"
    class="pt-16"
    small
  >
    {{ snackbar.content }}

    <template v-slot:action="{ attrs }">
      <v-btn
        dark
        text
        v-bind="attrs"
        @click="snackbar.model = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    snackbar: {
      get () {
        return this.$store.state.snackbar
      },
      set () {
        return this.$store.state.snackbar
      }
    }
  }
}
</script>

<style>

</style>
