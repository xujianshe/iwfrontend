import router from './router'
import store from './store/index'
import { Message } from 'element-ui'
let whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
    //获取token
    let hasToken = store.state.user.token
    if (hasToken) {
        //有token
        if (to.path === '/login') {
            next({
                path: '/'
            })
        } else {
            const username = store.getters.username;
            if(username){
                next()
            }else{
                try {
                    await store.dispatch('user/getInfo')
                    next()
                  } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                  }
            }
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next(`/login`)
        }
    }
})
