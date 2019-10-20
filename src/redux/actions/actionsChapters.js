import * as types from './../types'
import axios from 'axios'

export const getLatestChapters = () => ({
    type : types.GET_LATEST_CHAPTERS,
    payload : axios.get('http://192.168.73.2:5000/mangaky/chapter/latest')
})