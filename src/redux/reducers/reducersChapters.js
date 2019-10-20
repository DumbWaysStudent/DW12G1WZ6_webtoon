import * as types from './../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    chapters: []
  };
  const  reducerChapters = (state=initialState,action) =>{
    switch(action.type){
        case `${types.GET_LATEST_CHAPTERS}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.GET_LATEST_CHAPTERS}_FULFILLED`:
            return{
                ...state,
                isLoading: false,
                isSuccess: true,
                chapters: action.payload.data
            }
        case `${types.GET_LATEST_CHAPTERS}_REJECTED`:
            return{
                ...state,
                isError:true,
                isLoading:false
            }
        default :
            return state;
    }
  }
  export default reducerChapters