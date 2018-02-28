import Vue from 'vue';
import App from './App.vue';
// import router from './router';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-default/index.css';
// import ruLocale from 'element-ui/lib/locale/lang/ru-RU';
// import 'normalize.css';
// import 'font-awesome/css/font-awesome.css';
// import './assets/css/style.css';
// import './assets/images/favicon.ico';

// Vue.use(ElementUI, { locale: ruLocale });

new Vue({  
  el: '#app',
  // render: h => h(App),
  render: function(createElement) {
    return createElement(App);
  },
  // router: router
});
