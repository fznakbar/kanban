<template>
    <div>
        <div class="mt-5" style="text-align: center; font-family: monospace;">
        <h1>Welcome, to Kangban !</h1>
      </div>
      <div class="container">
        <div class="d-flex row justify-content-center mt-5">
          <div class="card p-5 bg-info" style="opacity: 95%;">
            <h2 style="text-align: center;" class="mb-4 text-body">Register Your Account</h2>
            <form v-on:submit.prevent="registerForm">
              <div style="position: static;" v-if="isError" class="alert alert-danger" role="alert">
              {{isError}}
              </div>
              <div class="form-group">
                <label for="email_register">Email address:</label>
                <input
                  type="email"
                  v-model="email_register"
                  class="form-control"
                  aria-describedby="emailHelp"
                  required
                />
                <small
                  id="emailHelp"
                  class="form-text text-muted"
                >We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="name_register">Name:</label>
                <input type="text" v-model="name_register" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="password_register">Password:</label>
                <input type="password" v-model="password_register" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="confirmpassword_register">Confirm Password:</label>
                <input
                  type="password"
                  v-model="confirmpassword_register"
                  class="form-control"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary mb-3">Register</button>
              <br />
              <a
                href
                style="color:blue;"
                v-on:click.prevent="changeLogin"
              >Already have an account? Login</a>
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
        email_register: null,
        name_register: null,
        password_register: null,
        confirmpassword_register: null,
        isError: null
        }
    },
    methods : {
        registerForm() {
            if (this.password_register !== this.confirmpassword_register) {
                this.isError = "Wrong Password"
            } else {
                axios({
                    method: 'post',
                    url: `${url}/users/register`,
                    data: {
                        email: this.email_register,
                        name: this.name_register,
                        password: this.password_register
                    }
                    })
                    .then(response => {
                        localStorage.setItem('token', response.data)
                        this.$emit("changePage", "mainPage");
                        this.$emit('refresh');
                    })
                    .catch(err => {
                        this.isError = err.response.data.msg
                    })
            }
        },
        changeLogin() {
            this.$emit("changePage", "loginPage");
        },
    },
    watch : {
        password_register(){
            this.isError = null
        },
        confirmpassword_register(){
            this.isError = null
        }

    }
}
</script>