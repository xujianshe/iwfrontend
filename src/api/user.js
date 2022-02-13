import request from '@/utils/request'

export const getUserInfo = params =>
    request({
        url: '/api/auth/info',
        method: 'get',
        params
    })

export const login = data =>
    request({
        url: '/api/login',
        method: 'post',
        data
    })
