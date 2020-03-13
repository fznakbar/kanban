<template>
    <div v-if="tasks.category === status" style="max-height: 70vh;">
        <div class="card mb-2">
            <div class="card-body mb-1">
                <h5 class="card-title">{{tasks.title}}</h5>
                <hr>
                <h5 class="card-title">{{tasks.description}}</h5>
                    <div>
                    <a v-if="tasks.category !== 'Backlog'" href="#" class="btn btn-dark" style="padding: 5px 5px;" v-on:click.prevent="switchLeft(tasks.id, tasks.category)">Cancel</a>
                    <a v-if="tasks.category !== 'Completed'" href="#" style="padding: 5px 5px;" class="btn btn-success" v-on:click.prevent="switchRight(tasks.id, tasks.category)">Next</a>
                    <a href="#" class="btn btn-info" style="padding: 5px 5px;" v-on:click.prevent="editTask(tasks.id)">Edit</a>
                    <a v-if="tasks.category === 'Completed'" href="#" style="padding: 5px 5px;" class="btn btn-danger" v-on:click.prevent="deleteTask(tasks.id)">Delete</a>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
let url = `https://hidden-shore-97996.herokuapp.com`
import axios from 'axios'
export default {
    props : [
        "tasks", "status"
    ],
    data() {
        return {
           
        }
    },
    methods : {
        deleteTask(id){
            axios({
                method : 'delete',
                url : `${url}/tasks/delete/${id}`,
                headers: {
                    access_token: localStorage.getItem('token')
                }
            })
            .then(response=>{
                this.$emit('refresh');

            })
            .catch(err => {
                console.log(err)
            })
        },
        switchRight(id, category){
            let tmp = null
            if(category === "Backlog"){
                tmp = "Todo"
            }else if(category === "Todo"){
                tmp = "Done"
            }else if(category === "Done"){
                tmp = "Completed"
            }
            axios({
                method : 'put',
                url : `${url}/tasks/edit/${id}`,
                headers: {
                    access_token: localStorage.getItem('token')
                },
                data: {
                    category : tmp
                }
            })
            .then(response =>{
                this.$emit('refresh');

            })
            .catch(err => {
                console.log(err)
            })
        },
        switchLeft(id, category){
            let tmp = null
            if(category === "Completed"){
                tmp = "Done"
            }else if(category === "Done"){
                tmp = "Todo"
            }else if(category === "Todo"){
                tmp = "Backlog"
            }
            axios({
                method : 'put',
                url : `${url}/tasks/edit/${id}`,
                headers: {
                    access_token: localStorage.getItem('token')
                },
                data: {
                    category : tmp
                }
            })
            .then(response =>{
                this.$emit('refresh');

            })
            .catch(err => {
                console.log(err)
            })
        },
        editTask(id){
            axios({
                method : 'get',
                url : `${url}/tasks/${id}`,
                headers: {
                    access_token: localStorage.getItem('token')
                },
            })
            .then(response =>{
                this.$emit("changePage", "editPage")
                this.$emit('dataTask', response.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>