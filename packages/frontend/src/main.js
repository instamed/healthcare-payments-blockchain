import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

// Set the backend hostname address. We use this in components to make API calls
//Vue.prototype.$hostname = '/api' // No trailing slash. If its / it defaults to self URL
Vue.prototype.$hostname = process.env.API_URL || 'http://localhost:8080/api'
// URL to pull block information from
//Vue.prototype.$block_explorer = window.location.protocol + '//' + window.location.hostname + ':4001' // no trailing slash
Vue.prototype.$block_explorer = 'http://localhost:4001'

Vue.prototype.$channel_id = 'ch1'

Vue.prototype.$provider_id = 'resource:org.fhir.core.Organization#XYZ_Provider'

Vue.prototype.$payer_id = 'resource:org.fhir.core.Organization#ABC_Healthcare'

// Can be toggled to use reuse a single patient id, which makes the demo run faster, or it can create a patient each time
Vue.prototype.$patient_id = 'resource:org.fhir.core.Patient#1'
Vue.prototype.$create_patients = true

Vue.config.productionTip = false

// For pretty printing JSON
import VueHighlightJS from 'vue-highlightjs'
Vue.use(VueHighlightJS)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
