import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import Login from './components/Login.vue'
import Welcome from './components/Welcome.vue'
import Weather from './components/Weather.vue'
import TravelCost from './components/TravelCost.vue'
import Recommendation from './components/Recommendation.vue'

Vue.use(Vuex);
Vue.use(VueRouter);

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    user: null,
    token: null,
    userWeatherSelection: [],
    isCheapFlightCostEnabled: false,
    cityWeather: [],
    cityFlightCost: []
  },
  mutations: {
    setUserData(state, payload) {
      const { dbUser, token } = payload;
      state.user = dbUser;
      state.token = token;
    },
    setUserWeatherSelection(state, payload) {
      state.userWeatherSelection = payload;
    },
    setCheapFlightCostFlag(state, payload) {
      state.isCheapFlightCostEnabled = payload;
    },
    setWeatherData(state, payload) {
      state.cityWeather.push(payload);
    },
    setFlightCost(state, payload) {
      state.cityFlightCost.push(payload);
    }
  },
  actions: {},
  getters: {}
});

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Welcome },
    { path: '/welcome', component: Welcome },
    { path: '/login', component: Login },
    { path: '/weather', component: Weather },
    { path: '/travel-cost', component: TravelCost },
    { path: '/recommendation', component: Recommendation },
  ]
})

new Vue({
  render: h => h(App),
  store: store,
  router,
}).$mount('#app')
