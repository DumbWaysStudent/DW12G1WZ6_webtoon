import * as types from './../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    mangaUser: []
  };
  const  reducerGetMangaUser = (state=initialState,action) =>{
    switch(action.type){
        case `${types.GET_MANGA_USER}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.GET_MANGA_USER}_FULFILLED`:
            return{
                ...state,
                isLoading: false,
                isSuccess: true,
                mangaUser: action.payload.data
            }
        case `${types.GET_MANGA_USER}_REJECTED`:
            return{
                ...state,
                isError:true,
                isLoading:false
            }
        default :
            return state;
    }
  }
  export default reducerGetMangaUser