<template>
  <div class="">
    <h1>Vault</h1>
  </div>
</template>

<script>
import AuthenticationServices from '@/services/AuthenticationService'
import encrypt from '@/assets/encryption'
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      masterpassword: '',
      confirmmpwd: '',
      remainder: '',
      success: false,
      error: null
    }
  },
  methods: {
    async register () {
      try {
        var hashData = await encrypt.hashPassword(this.email, this.masterpassword)
        var hashConfirmData = await encrypt.hashPassword(this.email, this.confirmmpwd)
        // var createEncryptionKey = await encrypt.hashPassword(this.masterpassword)
        await AuthenticationServices.register({
          email: this.email,
          masterpassword: hashData,
          confirmmpwd: hashConfirmData,
          remainder: this.remainder
        })
        this.success = true
      } catch (error) {
        const errors = error.response.data.error
        var errorMessages = ''
        // console.log(errors.errors)
        errors.forEach(error => {
            if(errorMessages != ''){
                errorMessages += '\n'
            }
            errorMessages += error.msg
        })
        this.error = errorMessages
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
