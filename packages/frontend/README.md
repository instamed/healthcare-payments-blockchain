# Healthcare Payments on Blockchain Frontend Demo App

This is a Vue.js/Vuetify frontend application which connects to the [Healthcare Payments in Blockchain](https://github.com/instamed/healthcare-payments-blockchain/).

The application is a single page that shows how the healthcare claim and payment process proceeds through all three primary users: provider, payer, and patient.

## Prerequisites

* [Node](https://nodejs.org/en/download/) 8.11

## Project setup
```
npm install
```
## Customize your configuration

Modify URL for API in /src/main.js
```
Vue.prototype.$hostname = 'https://blockchain-demo.instamed.com/api'
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
