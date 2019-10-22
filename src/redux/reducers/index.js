import { combineReducers } from 'redux';

import reducerChapters from './reducersChapters';
import reducerAuthentication from './reducersAuthentication'
import reducerMyFavorites from './reducerMyFavorites';
import reducerGetDetailManga from './reducerGetDetailManga'
import reducerGetChapterMangas from './reducerGetChapterMangas'

const appReducer = combineReducers({
  chapters: reducerChapters,
  authentication : reducerAuthentication,
  myFavorites : reducerMyFavorites,
  getDetailManga : reducerGetDetailManga,
  chapterMangas: reducerGetChapterMangas,
})

export default appReducer