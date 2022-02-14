import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, asyncRoutes,anyRoutes,constantRoutes} from '@/router'
import router from "@/router"
import cloneDeep from'lodash/cloneDeep'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    // 用户信息--权限
    buttons: [],
    roles: [],
    routes: [],
    // 拥有权限的路由
    allRoutes:[]
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // }
  SET_USERINFO: (state, userInfo) => {
    state.name = userInfo.name
    state.avatar = userInfo.avatar
    state.buttons = userInfo.buttons
    state.roles = userInfo.roles
    state.routes = userInfo.routes
  },
  SET_ROUTES:(state,res)=>{
    state.allRoutes = constantRoutes.concat(res,anyRoutes)
    // 除常量路由外的其他路由
    let otherRoutes = res.concat(anyRoutes)
    router.addRoutes(otherRoutes)
  }
}

// 算出有权限的路由
const computeRoute = function(asyncRoutes,route){
  return asyncRoutes.filter(item=>{
    if (route.indexOf(item.name)!=-1){
      if(item.children && item.children.length){
        item.children = computeRoute(item.children,route)
      }
      return true
    }
  })
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    let response = await login({ username: username.trim(), password: password })
    if (response) {
      const { data } = response
      commit('SET_TOKEN', data.token)
      setToken(data.token)
      return "ok"
    }
    return Promise.reject("登录失败")
  },

  // get user info
  async getInfo({ commit, state }) {
    let response = await getInfo(state.token)
    if (response) {
      const { data } = response
      if (!data) {
        return Promise.reject('Verification failed, please Login again.')
      }
      commit("SET_USERINFO", data)
      // 由于每次都会对asyncRoutes中的数据进行修改，为了不影响原数据，这里使用深拷贝，不然下次引用的时候数据已经被更改了
      let aaa = cloneDeep(asyncRoutes)
      let res = computeRoute(aaa,data.routes)
      commit("SET_ROUTES",res)
      return data
    }
    return Promise.reject("获取用户信息失败")
    // return new Promise((resolve, reject) => {
    //   getInfo(state.token).then(response => {
    //     const { data } = response
    //     if (!data) {
    //       return reject('Verification failed, please Login again.')
    //     }
    //     const { name, avatar } = data
    //     commit('SET_NAME', name)
    //     commit('SET_AVATAR', avatar)
    //     resolve(data)
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // user logout
  async logout({ commit, state }) {
    let response = await logout(state.token)
    if (response) {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      return "退出成功"
    }
    return Promise.reject(response.message)
    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
    //     removeToken() // must remove  token  first
    //     resetRouter()
    //     commit('RESET_STATE')
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

