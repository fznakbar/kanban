<template>
  <div>
    <div class="mt-5" style="text-align: center; font-family: monospace;">
      <h1>Welcome, to Kangban !</h1>
    </div>
    <div class="container">
      <div class="d-flex row justify-content-center mt-5">
        <div class="card p-5 bg-info" style="opacity: 95%;">
          <h2 style="text-align: center;" class="mb-4 text-body">Login</h2>
          <form v-on:submit.prevent="login">
            <div style="position: static;" v-if="isError" class="alert alert-danger" role="alert">
                {{isError}}
            </div>
            <div class="form-group">
              <label for="email_login">Email address:</label>
              <input v-model="email_login" type="email" class="form-control" value required />
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="password_login">Password:</label>
              <input v-model="password_login" type="password" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-primary mb-3">Login</button>
            <br />
            <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
            <a href style="color:blue" v-on:click.prevent="changeRegister">Don't have an account? Register</a>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
let url = `http://localhost:3000`
export default {
  data() {
    return {
      isLogin: localStorage.getItem("token"),
      seen: true,
      email_login: null,
      password_login: null,
      isError: null
    };
  },
  methods: {
    login() {
      axios({
        method: "post",
        url: `${url}/users/login`,
        data: {
          email: this.email_login,
          password: this.password_login
        }
      })
        .then(response => {
          localStorage.setItem("token", response.data);
          this.$emit("changePage", "mainPage");
          this.$emit('refresh');
        })
        .catch(err => {
          this.isError = err.response.data.msg;
        });
    },
    changeRegister() {
      this.$emit("changePage", "registerPage");
    }
  },
    watch : {
        password_login(){
            this.isError = null
        }
    }
};
</script>