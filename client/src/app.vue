<template>
  <div>
    <!-- NAVBAR SECTION -->
    <div v-if="page === 'mainPage'">
      <navbar @logout="logout"></navbar>
    </div>

    <!-- LOGIN SECTION -->
    <div v-if="page === 'loginPage'">
      <login @changePage="changePage" @refresh="refresh"></login>
    </div>

    <!-- REGISTER SECTION -->
    <div v-if="page === 'registerPage'">
      <register @changePage="changePage"></register>
    </div>
    <!-- MAIN PAGE SECTION -->
    <div v-if="page === 'mainPage'">
       <div class="container mt-3">
           <h2 style="text-align: center;">Monitor Your Works</h2>
          <div>
          <modalForm @refresh="refresh"></modalForm>
          </div>
          <br>
    
          <!-- BOARD SECTION -->
          <div class="d-flex flex-row">
            <div v-for="category in categories" :key="category.index" :class="category.class" style="text-align: center; height: 100%; opacity:93%">
              <div class="mt-2">
                <h4>{{category.name}}</h4>
              </div>
              <hr style="margin-top: 0px;">
              <div class="overflow-auto" style="max-height : 70vh">
                <div v-for="task in tasks" :key="task.index">
                    <card :status="category.name" :tasks="task" @refresh="refresh" @changePage="changePage" @dataTask="dataEdit"></card>
                </div>
              </div>
            </div>
          </div>
          <!-- END OF THE BOARD SECTION -->

      </div>
    </div>
    <!-- END OF MAIN SECTION -->

    <!-- EDIT SECTION -->
    <div class="container">
      <div class="d-flex row justify-content-center mt-5">
        <div class="col" v-if="page === 'editPage'">
            <editForm :dataEdit="dataEditForm" @changePage="changePage" @refresh="refresh"></editForm>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
let url = `http://localhost:3000`
import axios from 'axios'
import login from './components/login'
import register from './components/register'
import navbar from './components/navbar'
import modalForm from './components/modalForm'
import card from './components/card'
import editForm from './components/editForm.vue'
export default {
    components : {
        login,register,navbar,modalForm,card,editForm
    },
    data() {
       return { 
        dataEditForm : null,
        page : 'loginPage',
        tasks: [],
        categories: [
          {
            name : 'Backlog',
            class : 'card col-3 mr-3 pb-3'
          },
          { 
            name : 'Todo',
            class : 'card col-3 mr-3 pb-3 bg-primary'
          },
          { 
            name : 'Done',
            class : 'card col-3 mr-3 pb-3 bg-warning'
          },
          { name : 'Completed',
            class : 'card col-3 mr-3 pb-3 bg-success'
          }
        ],
      }
    },
    created() {
        if (localStorage.getItem('token')) {
            this.page = "mainPage"
            this.showData()
        }
    },
    methods: {
        dataEdit(payload){
          this.dataEditForm = payload
        },
        changePage(page){
            this.page = page
        },
        logout() {
            localStorage.removeItem('token')
            this.email_login = null
            this.password_login = null
            this.password_register = null
            this.confirmpassword_register = null
            this.email_register = null
            this.name_register = null
            this.page = 'loginPage'
        },
        showData() {
            axios({
                    method: 'get',
                    url: `${url}/tasks`,
                    headers: {
                        access_token: localStorage.getItem('token')
                    }
                })
                .then(response => {
                    this.readData(response.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        readData(data) {
            for (let i = 0; i < data.length; i++) {
                this.tasks.push(data[i])
            }
        },
        refresh(){
            this.tasks = []
            this.showData()
        },
    },
    watch: {
        password_login() {
            this.isError = null
        },
        confirmpassword_register() {
            this.isError = null
        }
    }
}
</script>