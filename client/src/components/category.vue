<template>
<div>
    <div class="mt-2">
        <h4>{{category.name}}</h4>
    </div>
    <hr style="margin-top: 0px;">
    <div class="overflow-auto" style="max-height : 70vh">
        <div v-for="task in tasks" :key="task.index">
            <card :status="category.name" :tasks="task" @refresh="refresh" @gantiHalaman="changePages" @dataTask="dataEdit"></card>
        </div>
    </div>
</div>
</template>

<script>
import card from '../components/card'
import axios from 'axios'
let url = 'http://localhost:3000'
export default {
    components : {
        card
    },
    props : [
        "category", "tasks"
    ],
    created() {
        
    },
    data () {
        return {
            dataEditForm : null,
            page : 'mainPage',
        }
    },
    methods : {
        changePages(page){
            this.$emit("changePage", page)
        },
        dataEdit(payload){
            this.$emit('dataTask', payload)
        },
        changePage(page){
            this.page = page
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
                this.tasks = response.data
            })
            .catch(err => {
                console.log(err)
            })
        },
        refresh(){
            this.$emit('refresh');
        },
    }
}
</script>