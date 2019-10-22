import * as types from './../types'
import axios from 'axios'

export const getChaptersMangas = (params,token) => ({

    type : types.GET_CHAPTERS,
    payload : axios.get(`http://192.168.73.2:5000/mangaky/chapter/manga/${params}`,{
        headers : {"Authorization" : `Bearer ${token}`}
    })

    

})