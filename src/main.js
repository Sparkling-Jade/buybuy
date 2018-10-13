import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import moment from "moment";
import index from './components/index.vue'
import details from "./components/details.vue"



import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  //预加载高度
  preLoad: 1.3,
  //报错图片
  error:require('./assets/img/timg.gif'),
  //成功图片
  loading: require('./assets/img/lazyload.gif'),
   //次数
  attempt: 1
})

import axios from "axios";
//把axios挂载到vue原型上 让vue原型有这个方法
Vue.prototype.$axios=axios;

//使用axios设置基础地址
axios.defaults.baseURL = 'http://111.230.232.110:8899';

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

Vue.use(VueRouter)

// 路由规则
const routes=[
    { 
      path: '/',
       redirect: '/index'
   
  },
  
  {
    path:'/index',
    component:index
  },
  {
    path:'/details/:id',
    component:details
  }
]
//实例化对象
const router=new VueRouter({
    routes
})

Vue.config.productionTip = false

Vue.filter('beautifulTime', function (value) {
     return moment(value).format("YYYY年MM月DD日");
})

Vue.filter('beautifulTimeData', function (value) {
  return moment(value).format("YYYY年MM月DD日/HH:mm:ss");
})

import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // count: 0
    shopCartData:JSON.parse(window.localStorage.getItem('cartData'))||{}
  },
  mutations: {
     addCart(state,opt){
         //console.log(state);
         // console.log(opt);
        if (state.shopCartData[opt.id]==undefined) {
            Vue.set(state.shopCartData,opt.id,opt.buyCount=opt.buyCount) 
        }else{
          
          state.shopCartData[opt.id]+=opt.buyCount;
        }          
       }
  },
  getters:{
     toCart(state){
          let totalCount=0;
          for (const key in state.shopCartData){
            totalCount += state.shopCartData[key]
          }
          return totalCount;
     }
  }
})

new Vue({

  render: h => h(App),
   router,
   store

}).$mount('#app')

//浏览器关闭事件
window.onbeforeunload=function(){
   window.localStorage.setItem('cartData',JSON.stringify(store.state.shopCartData))
}