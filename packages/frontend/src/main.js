import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

// Set the backend hostname address. We use this in components to make API calls
Vue.prototype.$hostname = 'https://blockchain-demo.instamed.com/api' // no trailing slash

Vue.prototype.$provider_id = 'resource:org.fhir.core.Organization#Southbend_Flu_Clinic'

Vue.prototype.$payer_id = 'resource:org.fhir.core.Organization#All_American_Health'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')