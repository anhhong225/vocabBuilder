import Vue from 'vue';
import App from './App.vue';
import router from './router';

import 'semantic-ui-css/semantic.css';

Vue.config.productionTip = false;// Disabling the production tip in Vue.js

new Vue({
  router,// Injecting the router into the Vue instance to handle application navigation
  render: h => h(App) //creating a virtual DOM node for the App component
}).$mount('#app'); //Mounting the Vue instance to the DOM element with the ID 'app'
