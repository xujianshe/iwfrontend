import Vue from 'vue'
import { login, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'


const state = {
    token: getToken(),
    userId:'',
    username: '',
    avatar: '',
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USERID:(state,userId)=>{
        state.userId=userId;
        Vue.set(state, 'userId', userId)
    },
    SET_NAME: (state, username) => {
        state.username = username
        Vue.set(state, 'username', username)
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_COMPANY: (state, company) => {
        Vue.set(state, 'company', company)
    },
    SET_EMAIL: (state, email) => {
        Vue.set(state, 'email', email)
    },

}

const actions = {
    login({commit}, userInfo) {
        return new Promise((resolve, reject) => {
            let token="Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY0NDkzNjI5MywiZXhwIjoxNjQ1NTQxMDkzfQ.CQO2BHhL2xPZsmrGE9LGFwdxVvV2so5S-9LSVIgp5b3xHi_GGVA7S9HMDnFJd_izumYVzKKxsvfGzfAU5GRbYA";
            commit('SET_TOKEN',token);
            setToken(token)
            resolve(token)
        //     login(userInfo).then(response => {
        //         //console.log(response.token)
        //         commit('SET_TOKEN', response.token)
        //         setToken(response.token)

        //         resolve(response)
        //     }).catch(error => {
        //         console.log("登录失败", error)
        //         reject(error)
        //     })
        })
    },

    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {

                commit('SET_USERID', 1)
                commit('SET_NAME', 'admin')
                commit('SET_AVATAR', '')
                resolve('')

            // getUserInfo().then(response => {
            //     if (!response) {
            //         reject('Verification failed, please Login again.')
            //     }
            //     // 在这里设置用户信息
            //     commit('SET_USERID', response.accountInfo.userId)
            //     commit('SET_NAME', response.accountInfo.username)
            //     commit('SET_AVATAR', response.accountInfo.avatar)
            //     resolve(response)
            // }).catch(error => {
            //     // alert(JSON.stringify(error))
            //     reject(error)
            // })
        })
    },
  
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            commit('SET_TOKEN', '')
            commit('SET_NAME', '')
            removeToken()
            resolve()
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
