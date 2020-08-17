<template>
  <div class="">
    <pre>
      <h3 v-show="success">Register Success</h3>
      <h1>Register</h1>
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
        placeholder="Master Password"
        v-model="masterpassword"
      />
      <br>
      <input 
        type="text"
        name="confirmmpwd"
        placeholder="Confirm Master Password"
        v-model="confirmmpwd"
      />
      <br>
      <input 
        type="text"
        name="remainder"
        placeholder="Remainder (optional)"
        v-model="remainder"
      />
      <br>
      <div v-html="error"></div>
      <button
        @click="register"
      >Create Account</button>
    </pre>
  </div>
</template>

<script>
import AuthenticationServices from '@/services/AuthenticationService'
export default {
  name: 'HelloWorld',
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
        await AuthenticationServices.register({
          email: this.email,
          masterpassword: this.masterpassword,
          confirmmpwd: this.confirmmpwd,
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
