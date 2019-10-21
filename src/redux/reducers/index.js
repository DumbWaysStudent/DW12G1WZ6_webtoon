import { combineReducers } from 'redux';

import reducerChapters from './reducersChapters';
import reducerAuthentication from './reducersAuthentication'
import reducerMyFavorites from './reducerMyFavorites';

const appReducer = combineReducers({
  chapters: reducerChapters,
  authentication : reducerAuthentication,
  myFavorites : reducerMyFavorites
})

export default appReducer