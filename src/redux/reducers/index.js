import { combineReducers } from 'redux';

import reducerChapters from './reducersChapters';

const appReducer = combineReducers({
  chapters: reducerChapters,
})

export default appReducer