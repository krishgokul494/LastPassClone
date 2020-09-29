<template>
  <div class="logo favicon">
    <router-link to="/Vault" exact>
      <span style="color: #383838">&lt;One</span><span style="color: #00a8f3">Pass&gt;</span>
    </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  @font-face {
    font-family: ChangaOne;
    src: url(../assets/ChangaOne-Regular.ttf)
  }

  .logo {
    font-family: ChangaOne;
    font-size: xx-large;
  }

  .favicon {
    font-size: clamp(1.6rem, 4.5vw, 2rem)
  }
</style>
