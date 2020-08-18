<template>
  <div class="welcome">
    <img alt="logo" src="../assets/logo.png" />
    <h1 v-if="isUserLoggedIn">Hi {{ this.user.name }}</h1>
    <h2>Welcome to { office finder }</h2>
    <p>We would like to know your interest to recommend right office location.<br/> Please choose atleast one preferred option.</p>
    <router-link v-if="!isUserLoggedIn" to="/login">Login</router-link>
    <router-link v-else to="/weather">Start</router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Welcome',

  computed: {
    ...mapState(['user', 'token']),

    isUserLoggedIn() {
      return this.user !== null && this.token !== null;
    }
  }
}
</script>


<style lang="scss" scoped>
.welcome {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    img {
      width: 150px;
    }

    h1 {
      font-size: 30px;
      margin: 10px 0;
    }

    h2 {
      font-size: 26px;
      margin: 10px 0;
    }

    p {
      font-size: 16px;
      line-height: 1.5;
    }

    a {
      font-size: 20px;
      font-weight: 700;
      color: #2c3e50;
      border: 1px solid #34495E;
      border-radius: 4px;
      background-color: #fff;
      text-decoration: none;
      padding: 10px 30px;
      margin: 30px 0 0;
      cursor: pointer;
    }
}
</style>
