import Vue from 'vue'
import VueBus from 'vue-bus'
import axios from 'axios'
import App from './App.vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

Vue.config.productionTip = false

Vue.component('VueSlider', VueSlider)
Vue.use(VueBus);

new Vue({
  render: h => h(App),
}).$mount('#app')
