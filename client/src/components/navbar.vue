<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-dark" style="opacity : 94%">
        <a class="navbar-brand" href="#" style="font-family: courier; color:white">KANBAN</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup"></div>
        <button class="btn btn-primary" v-on:click.prevent="logout">Logout</button>
      </nav>
    </div>
</template>
<script>

import axios from 'axios'
export default {
    data () {
        return {

        }
    },
    methods : {
        logout(){
          this.$gAuth.signOut()
          .then(() => {
            this.$emit('logout')
          })
          .catch(error  => {
            console.log(err)
          })
        }
    }
}
</script>