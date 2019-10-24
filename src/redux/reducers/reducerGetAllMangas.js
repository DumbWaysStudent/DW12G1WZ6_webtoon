import * as types from './../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    allMangas: []
  };
  const  reducerGetAllMangas = (state=initialState,action) =>{
    switch(action.type){
        case `${types.GET_ALL_MANGAS}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.GET_ALL_MANGAS}_FULFILLED`:
            return{
                ...state,
                isLoading: false,
                isSuccess: true,
                allangas: action.payload.data
            }
        case `${types.GET_ALL_MANGAS}_REJECTED`:
            return{
                ...state,
                isError:true,
                isLoading:false
            }
        default :
            return state;
    }
  }
  export default reducerGetAllMangas