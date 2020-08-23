<template>
  <div class="">
    <pre>
      <h1>Login</h1>
      <input
        type="email"
        name="email"
        placeholder="Email"
        v-model="email"
      />
      <br>
      <input
        type="text"
        name="masterpassword"
        pattern="/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/"
        placeholder="Master Password"
        v-model="masterpassword"
      />
      <br>
      <div v-html="error"></div>
      <button
        @click="login"
      >Login</button>
    </pre>
  </div>
</template>

<script>
import AuthenticationServices from '@/services/AuthenticationService'
import encrypt from '@/assets/encryption'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      masterpassword: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        var hashData = await encrypt.hashPassword(this.email, this.masterpassword)
        var response = await AuthenticationServices.login({
          email: this.email,
          masterpassword: hashData
        })

        var encryptionSalt = response.data.encryptionSalt
        await sessionStorage.setItem('encryptionKey', encrypt.hashPassword(encryptionSalt, this.masterpassword))
        window.location.replace('./vault')
        console.log(response)
      } catch (error) {
        console.log(error.response.data)
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
