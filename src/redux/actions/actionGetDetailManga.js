import * as types from './../types'
import axios from 'axios'

export const getDetailManga = (params) => ({

    type : types.GET_DETAIL_MANGA,
    payload : axios.get(`http://192.168.73.2:5000/mangaky/manga/search/id/${params}`)
})