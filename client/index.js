// const urlHeroku = "https://murmuring-lowlands-78173.herokuapp.com/"
const urlLocalHost = "http://localhost:3000"

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Fighter!',
        tasks: [],
        isLogin: localStorage.getItem('token'),
        register: false,
        seen: true,
        email_login: null,
        password_login: null,
        email_register: null,
        name_register: null,
        password_register: null,
        confirmpassword_register: null,
        isError: null,
        dataBacklog: [],
        dataTodo: [],
        dataDone: [],
        dataCompleted: []
    },
    created() {
        if (this.isLogin) {
            this.showData()
        }
    },
    methods: {
        addCard() {
            this.tasks.push({
                title: 'ini title',
                description: 'Akbar gapunya dagu'
            })
        },
        login() {
            axios({
                    method: 'post',
                    url: `${urlLocalHost}/users/login`,
                    data: {
                        email: this.email_login,
                        password: this.password_login
                    }
                })
                .then(response => {
                    localStorage.setItem('token', response.data)
                    this.isLogin = localStorage.getItem('token')
                    this.showData()
                })
                .catch(err => {
                    this.isError = err.response.data.msg
                })
        },
        registerForm() {
            if (this.password_register !== this.confirmpassword_register) {
                this.isError = "Wrong Password"
            } else {
                axios({
                    method: 'post',
                    url: `${urlLocalHost}/users/register`,
                    data: {
                        email: this.email_register,
                        name: this.name_register,
                        password: this.password_register
                    }
                    })
                    .then(response => {
                        localStorage.setItem('token', response.data)
                        this.isLogin = localStorage.getItem('token')
                    })
                    .catch(err => {
                        this.isError = err.response.data.msg
                    })
            }
        },
        changeRegister() {
            this.register = true
        },
        changeLogin() {
            this.register = false
        },
        logout() {
            localStorage.removeItem('token')
            this.isLogin = localStorage.getItem('token')
            this.email_login = null
            this.password_login = null
            this.password_register = null
            this.confirmpassword_register = null
            this.email_register = null
            this.name_register = null
        },
        showData() {
            axios({
                    method: 'get',
                    url: `${urlLocalHost}/tasks`,
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
                url : `${urlLocalHost}/tasks/delete/${id}`,
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
                url : `${urlLocalHost}/tasks/edit/${id}`,
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
                url : `${urlLocalHost}/tasks/edit/${id}`,
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
        isLogin() {},
        password_login() {
            this.isError = null
        },
        confirmpassword_register() {
            this.isError = null
        }
    }
})