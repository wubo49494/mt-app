import Vue from 'vue'
import Vuex from 'vuex'

import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    modules: {
      geo,
      home
    },
    actions: {
      
      async nuxtServerInit({commit}, {req, app}) { 
        { // nuxtServerInit 将服务端的一些数据传到客户端
          const { status, data: { province, city }
          } = await app.$axios.get('/geo/getPosition')
          commit('geo/setPosition', status === 200 ? {
            city,
            province
          } : {
            city: '',
            province: ''
          })
        } {
          const {
            status: status1,
            data: {
              menu
            }
          } = await app.$axios.get('/geo/menu')
          commit('home/setMenu', status1 === 200 ? menu : [])
        } {
          const {
            status: status2,
            data: {
              pois: suggest
            }
          } = await app.$axios.get(encodeURI(`https://restapi.amap.com/v3/place/text?keywords=美食&offset=5&page=1&city=${this.state.geo.position.city}&key=a776091c1bac68f3e8cda80b8c57627c&extensions=base`))
          commit('home/setSuggest', status2 === 200 ? suggest : [])
        } {
          const {
            status: status3,
            data: {
              pois: hotword
            }
          } = await app.$axios.get(encodeURI(`https://restapi.amap.com/v3/place/text?keywords=景点&offset=4&page=1&city=${this.state.geo.position.city}&key=a776091c1bac68f3e8cda80b8c57627c&extensions=all`))
          commit('home/setHotWord', status3 === 200 ? hotword : [])
        } {
          let {
            status: status4,
            data: {
              pois: view
            }
          } = await app.$axios.get(encodeURI(`https://restapi.amap.com/v3/place/text?keywords=景点&offset=20&page=1&city=${this.state.geo.position.city}&key=a776091c1bac68f3e8cda80b8c57627c&extensions=all`))
          view = view.filter(item => item.photos.length && item.biz_ext.cost.length).slice(0, 6)
          commit('home/setHotWord', status4 === 200 ? view : [])
        }
      }
    }
  })
export default store
