requi
import Vue from 'vue'
import App from './app.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '210400129285-0sdv4aoueo9ivf0381ckephgsiqqau43.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
new Vue({
    render : h => h(App)
}).$mount('#app')
