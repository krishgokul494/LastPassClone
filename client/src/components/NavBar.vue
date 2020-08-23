<template>
  <div>
      <button @click="logout">Logout</button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
    name: 'NavBar',
    data () {
        return {
            logged: this.$logged
        }
    },
    methods: {
        async logout() {
            try {
                var loggedOut = AuthenticationService.logout()
                if(loggedOut){
                    window.location.replace('./')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style>

</style>