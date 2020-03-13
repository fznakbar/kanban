<template>
    <div>
        <h1>Edit Your Task</h1>
        <form class="form-group" v-on:submit.prevent="editTask">
        <label for="fname">Title:</label><br>
        <input class="form-control" v-model="title_edit" type="text" id="fname" name="fname"><br>
        <label for="lname">Description:</label><br>
        <input class="form-control" v-model="description_edit" type="text" id="lname" name="lname" ><br><br>
        <input class="btn btn-primary" type="submit" value="Submit">
        </form>
    </div>
</template>
<script>
let url = `https://hidden-shore-97996.herokuapp.com`
import axios from 'axios'
export default {
    props : [
        "dataEdit"
    ],
    data (){
        return {
            title_edit : null,
            description_edit : null
        }
    },
    created() {
        this.title_edit = this.dataEdit.title
        this.description_edit = this.dataEdit.description
        this.editId = this.dataEdit.id
    },
    methods : {
        editTask() {
            axios({
                method : 'put',
                url : `${url}/tasks/edit/${this.editId}`,
                headers: {
                    access_token: localStorage.getItem('token')
                },
                data: {
                    title : this.title_edit,
                    description : this.description_edit
                }
            })
            .then(response =>{
                this.$emit("changePage", "mainPage")
                this.$emit('refresh');
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>