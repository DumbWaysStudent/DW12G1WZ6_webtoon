import * as types from './../types'
import axios from 'axios'

export const getMangasRecomendation = () => ({
    type : types.MANGAS,
    payload : axios.get('http://192.168.73.2:5000/mangaky/manga/recommendation')
})