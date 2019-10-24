import * as types from './../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    mangas: []
  };

// tampilin manga rekomendasi di home
export const mangaRecomendation = (state=initialState,action) =>{
    switch(action.type){
        case `${types.MANGAS}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.MANGAS}_FULFILLED`:
            return{
                ...state,
                isLoading: false,
                isSuccess: true,
                mangas: action.payload.data
            }
        case `${types.MANGAS}_REJECTED`:
            return{
                ...state,
                isError:true,
                isLoading:false
            }
        default :
            return state;
    }
  }
 