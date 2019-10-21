import * as types from './../types'
import axios from 'axios'

export const getMyFavorites = (params) => ({
    type : types.GET_MY_FAVORITES,
    payload : axios.get(`http://192.168.73.2:5000/mangaky/manga/favorite/${params}`)
})