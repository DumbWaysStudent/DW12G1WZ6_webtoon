import * as types from './../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    detailManga: []
  };
  const  reducerGetDetailManga = (state=initialState,action) =>{
    switch(action.type){
        case `${types.GET_DETAIL_MANGA}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.GET_DETAIL_MANGA}_FULFILLED`:
            return{
                ...state,
                isLoading: false,
                isSuccess: true,
                detailManga: action.payload.data
            }
        case `${types.GET_DETAIL_MANGA}_REJECTED`:
            return{
                ...state,
                isError:true,
                isLoading:false
            }
        default :
            return state;
    }
  }
  export default reducerGetDetailManga