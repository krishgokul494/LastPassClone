<template>
  <v-footer
    absolute
    dark
    padless
    class="footer"
    app
  >
    2020
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram'
    ]
  })
}
</script>

<style>
  .footer {
    background-color: black;
    height: 5%;
  }
</style>
