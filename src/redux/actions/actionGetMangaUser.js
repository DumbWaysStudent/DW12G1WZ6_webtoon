import * as types from './../types'
import axios from 'axios'

export const getMangaUser = (params,token) => ({

    type : types.GET_MANGA_USER,
    payload : axios.get(`http://192.168.73.2:5000/mangaky/manga/user/${params}`,{
        headers : {"Authorization" : `Bearer ${token}`}
    })
})