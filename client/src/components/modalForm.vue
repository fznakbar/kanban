<template>
    <div>
        <b-button v-b-modal.modal-prevent-closing>Add Backlog</b-button>

        <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Add New Back-log"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
        >
        <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group
            :state="nameState"
            label="Title"
            label-for="name-input"
            invalid-feedback="Title is required"
            >
            <b-form-input
                id="name-input"
                v-model="title_modal"
                :state="nameState"
                required
            ></b-form-input>
    <!--  -->
            <b-form-group
            :state="nameState"
            label="Description"
            label-for="name-input"
            invalid-feedback="Description is required"
            >
            <b-form-input
                id="name-input"
                v-model="description_modal"
                :state="nameState"
                required
            ></b-form-input>
    <!--  -->

            </b-form-group>
        </form>
    </b-modal>
    </div>
</template>

<script>
// let url = `https://hidden-shore-97996.herokuapp.com`
let url = `http://localhost:3000`
import axios from 'axios'
export default {
    data () {
        return {
        name: '',
        nameState: null,
        submittedNames: [],
        title_modal : null,
        description_modal : null,
        }
    },
    methods : {
        checkFormValidity() {
          const valid = this.$refs.form.checkValidity()
          this.nameState = valid
          return valid
        },
        resetModal() {
          this.description_modal = ''
          this.title_modal = ''
          this.nameState = null
        },
        handleOk(bvModalEvt) {
          bvModalEvt.preventDefault()
          this.handleSubmit()
        },
        handleSubmit() {
          if (!this.checkFormValidity()) {
            return
          }
          this.addForm(this.title_modal, this.description_modal)
          this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
          })
        },
        addForm(title, description){
          axios({
            method : 'post',
            url : `${url}/tasks/`,
            headers: {
                    access_token: localStorage.getItem('token')
            },
            data : {
              title : title,
              description : description,
              category : 'Backlog'
            }
          })
          .then(response=>{
            this.title_modal = null,
            this.description_modal = null,
            this.$emit('refresh');

          })
          .catch(err => {
            console.log(err)
          })
        },
    }
}
</script>