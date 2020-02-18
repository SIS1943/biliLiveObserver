import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import vuetify from './plugins/vuetify';

Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  Vuetify,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
