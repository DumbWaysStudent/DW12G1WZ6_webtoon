import * as types from './../types'
import axios from 'axios'

export const login = (params) => ({
    type : types.LOGIN,
    payload : axios.post('http://192.168.73.2:5000/mangaky/login',{
        email : params.inputUsername,
        password : params.inputPassword
    })
})