import * as types from './../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    pages: []
  };
  const  reducerGetPages = (state=initialState,action) =>{
    switch(action.type){
        case `${types.GET_PAGES}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.GET_PAGES}_FULFILLED`:
            return{
                ...state,
                isLoading: false,
                isSuccess: true,
                pages: action.payload.data
            }
        case `${types.GET_PAGES}_REJECTED`:
            return{
                ...state,
                isError:true,
                isLoading:false
            }
        default :
            return state;
    }
  }
  export default reducerGetPages