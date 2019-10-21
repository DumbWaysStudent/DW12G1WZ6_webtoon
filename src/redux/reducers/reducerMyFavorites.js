import * as types from './../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    myFavorites: []
  };
  const  reducerMyFavorites = (state=initialState,action) =>{
    switch(action.type){
        case `${types.GET_MY_FAVORITES}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.GET_MY_FAVORITES}_FULFILLED`:
            return{
                ...state,
                isLoading: false,
                isSuccess: true,
                myFavorites: action.payload.data
            }
        case `${types.GET_MY_FAVORITES}_REJECTED`:
            return{
                ...state,
                isError:true,
                isLoading:false
            }
        default :
            return state;
    }
  }
  export default reducerMyFavorites