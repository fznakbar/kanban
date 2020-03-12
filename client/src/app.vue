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
      <div class="container mt-5">
        <h2 style="text-align: center;">SEMANGAT !</h2>
        <br />
        <!-- <a class="nav-item nav-link" href="#" v-on:click="addCard">Add Plan</a> -->
        <div class="d-flex flex-row">
          <div
            class="card col-3 mr-3 pb-3"
            style="text-align: center; background-color:white; height: 100%;"
          >
            <div class="mt-2">
              <h4>Back-Log</h4>
            </div>
            <hr style="margin-top: 0px;" />
            <div style="max-height: 70vh;" class="overflow-auto">
              <div class="card mb-2" v-for="task in dataBacklog" :key="task.id">
                <div class="card-body mb-1">
                  <h5 class="card-title">{{task.title}}</h5>
                  <h5 class="card-title">{{task.description}}</h5>
                  <div>
                    <a
                      href="#"
                      class="btn btn-info"
                      v-on:click.prevent="switchRight(task.id, task.category)"
                    >Proccess</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card col-3 bg-warning mr-3 pb-3" style="text-align: center; height: 100%;">
            <div class="mt-2">
              <h4>Todo</h4>
            </div>
            <hr style="margin-top: 0px;" />
            <div style="max-height: 70vh;" class="overflow-auto">
              <div class="card mb-2" v-for="task in dataTodo" :key="task.id">
                <div class="card-body mb-1">
                  <h5 class="card-title">{{task.title}}</h5>
                  <h5 class="card-title">{{task.description}}</h5>
                  <div>
                    <a
                      href="#"
                      class="btn btn-dark"
                      v-on:click.prevent="switchLeft(task.id, task.category)"
                    >Cancel</a>
                    <a
                      href="#"
                      class="btn btn-primary"
                      v-on:click.prevent="switchRight(task.id, task.category)"
                    >Finish</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card col-3 bg-primary mr-3 pb-3" style="text-align: center; height: 100%;">
            <div class="mt-2">
              <h4>Done</h4>
            </div>
            <hr style="margin-top: 0px;" />
            <div style="max-height: 70vh;" class="overflow-auto">
              <div class="card mb-2" v-for="task in dataDone" :key="task.id">
                <div class="card-body mb-1">
                  <h5 class="card-title">{{task.title}}</h5>
                  <h5 class="card-title">{{task.description}}</h5>
                  <div>
                    <a
                      href="#"
                      class="btn btn-dark"
                      v-on:click.prevent="switchLeft(task.id, task.category)"
                    >Abort</a>
                    <a
                      href="#"
                      class="btn btn-success"
                      v-on:click.prevent="switchRight(task.id, task.category)"
                    >Verify</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card col-3 bg-success pb-3" style="text-align: center; height: 100%; opacity: 93%;">
            <div class="mt-2">
              <h4>Completed</h4>
            </div>
            <hr style="margin-top: 0px;">
            <div style="max-height: 70vh;" class="overflow-auto">
              <div class="card mb-2" v-for="task in dataCompleted" :key="task.id">
                <div class="card-body mb-1">
                  <h5 class="card-title">{{task.title}}</h5>
                  <h5 class="card-title">{{task.description}}</h5>
                  <div>
                    <a
                      href="#"
                      class="btn btn-dark"
                      v-on:click.prevent="switchLeft(task.id, task.category)"
                    >Recheck</a>
                    <a
                      href="#"
                      class="btn btn-danger"
                      v-on:click.prevent="deleteTask(task.id)"
                    >Delete</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import axios from 'axios'
import login from './components/login'
import register from './components/register'
import navbar from './components/navbar'
export default {
    components : {
        login,register,navbar
    },
    data() {
       return { 
        message: 'Hello Fighter!',
        page : 'loginPage',
        tasks: [],
        // isLogin: localStorage.getItem('token'),
        register: false,
        seen: true,
        // email_register: null,
        // name_register: null,
        // password_register: null,
        // confirmpassword_register: null,
        // isError: null,
        dataBacklog: [],
        dataTodo: [],
        dataDone: [],
        dataCompleted: []}
    },
    created() {
        if (localStorage.getItem('token')) {
            this.page = "mainPage"
            this.showData()
        }
    },
    methods: {
        changePage(page){
            this.page = page
        },
        // insertToken(payload){
        //     this.isLogin = payload
        // },
        addCard() {
            this.tasks.push({
                title: 'ini title',
                description: 'Akbar gapunya dagu'
            })
        },
        logout() {
            localStorage.removeItem('token')
            // this.isLogin = localStorage.getItem('token')
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
                    url: `http://localhost:3000/tasks`,
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
                if (data[i].category === "backlog") {
                    this.dataBacklog.push(data[i])
                } else if (data[i].category === "todo") {
                    this.dataTodo.push(data[i])
                } else if (data[i].category === "completed") {
                    this.dataCompleted.push(data[i])
                } else if (data[i].category === "done") {
                    this.dataDone.push(data[i])
                }
            }
        },
        refresh(){
            this.dataCompleted = []
            this.dataBacklog = []
            this.dataDone = []
            this.dataTodo = []
            this.showData()
        },
        deleteTask(id){
            axios({
                method : 'delete',
                url : `http://localhost:3000/tasks/delete/${id}`,
                headers: {
                    access_token: localStorage.getItem('token')
                }
            })
            .then(response=>{
                this.refresh()
            })
            .catch(err => {
                console.log(err)
            })
        },
        switchRight(id, category){
            let tmp = null
            if(category === "backlog"){
                tmp = "todo"
            }else if(category === "todo"){
                tmp = "done"
            }else if(category === "done"){
                tmp = "completed"
            }
            axios({
                method : 'put',
                url : `http://localhost:3000/tasks/edit/${id}`,
                headers: {
                    access_token: localStorage.getItem('token')
                },
                data: {
                    category : tmp
                }
            })
            .then(response =>{
                this.refresh()
            })
            .catch(err => {
                console.log(err)
            })
        },
        switchLeft(id, category){
            let tmp = null
            if(category === "completed"){
                tmp = "done"
            }else if(category === "done"){
                tmp = "todo"
            }else if(category === "todo"){
                tmp = "backlog"
            }
            axios({
                method : 'put',
                url : `http://localhost:3000/tasks/edit/${id}`,
                headers: {
                    access_token: localStorage.getItem('token')
                },
                data: {
                    category : tmp
                }
            })
            .then(response =>{
                this.refresh()
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    watch: {
        // isLogin() {
        //     console.log('isLogin watched')
        // },
        password_login() {
            this.isError = null
        },
        confirmpassword_register() {
            this.isError = null
        }
    }
}
</script>