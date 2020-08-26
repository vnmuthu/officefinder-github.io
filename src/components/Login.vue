<template>
  <div class="login">
    <form @submit="userLogin">
      <img alt="logo" src="../assets/logo.png" />
      <h1>{ office finder }</h1>
      <input type="text" placeholder="username" v-model="username" /><br />
      <input type="password" placeholder="password" v-model="password" /><br />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Login',

  data() {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    ...mapMutations (["setUserData"]),

    async userLogin(e) {
      e.preventDefault();
      const response = await fetch('/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      });

      const userData = await response.json();
      console.log('userData', userData);
      this.setUserData(userData);
      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  img {
    width: 150px;
    margin: 0 auto;
  }

  h1, form {
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-size: 40px;
    margin-bottom: 60px;
  }

  input {
    border: 1px solid #34495E;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 15px;
  }

  button {
    width: 50%;
    margin: 0 auto;
  }
}
</style>
