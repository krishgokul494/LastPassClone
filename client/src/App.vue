<template>
  <v-app id="app">
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css" rel="stylesheet">
    <!-- <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> -->
    <TheNavigation/>
    <NavigationDrawer></NavigationDrawer>
    <v-main>
      <Notifications/>
      <router-view/>
      <br>
    </v-main>
    <SideBar v-if="logged"/>
    <!-- <TheFooter/> -->
  </v-app>
</template>

<script>
/* eslint-disable */
import LogoText from '@/components/LogoText'
import NavigationDrawer from '@/components/NavigationDrawer'
import TheNavigation from '@/components/TheNavigation'
import SideBar from '@/components/SideBar'
import TheFooter from '@/components/TheFooter'
import Notifications from '@/components/Notifications'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    NavigationDrawer,
    TheNavigation,
    LogoText,
    SideBar,
    TheFooter,
    Notifications
  },
  methods: {

  },
  computed: {
    logged () {
      return this.$store.state.logged
    }
  }
};
</script>

<style>
  /* .scrollbar-hidden::-webkit-scrollbar {
    display: none
  }

  html{
    overflow-y: hidden
  } */
  .v-application a {
    text-decoration: none;
  }
</style>
