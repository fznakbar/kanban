<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#" style="font-family: courier;">KANGBAN</a>
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
            this.$emit('logout')
        }
    }
}
</script>