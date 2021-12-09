import Vue from 'vue'
import App from './App.vue'
import VTableLesson from '../../dist/101-table-lesson.umd';
import '../../dist/101-table-lesson.min.css'

Vue.use(VTableLesson)

new Vue({
  el: '#app',
  render: h => h(App)
})
