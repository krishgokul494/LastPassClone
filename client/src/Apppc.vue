<template>
  <v-app id="app">
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css" rel="stylesheet">
    
    <TheNavigation/>
    <NavigationDrawer v-if="logged"/>
    <v-main>
      <router-view/>
    </v-main>
    <SideBar/>
    <!-- <TheFooter/> -->
  </v-app>
</template>

<script>
/* eslint-disable */

import HelloWorld from './components/HelloWorld';
import LogoText from '@/components/LogoText'
import NavigationDrawer from '@/components/NavigationDrawer'
import TheNavigation from '@/components/TheNavigation'
import SideBar from '@/components/SideBar'
import TheFooter from '@/components/TheFooter'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    NavigationDrawer,
    TheNavigation,
    HelloWorld,
    LogoText,
    SideBar,
    TheFooter
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
    color: #00a8f3;
    text-decoration: none;
  }
</style>
