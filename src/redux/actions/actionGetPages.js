import * as types from './../types'
import axios from 'axios'

export const getPages = (manga,chapter,token) => ({
    type : types.GET_PAGES,
    payload : axios.get(`http://192.168.73.2:5000/mangaky/manga/read/manga/${manga}/chapter/${chapter}`,{
        headers : {"Authorization" : `Bearer ${token}`}
    })
})