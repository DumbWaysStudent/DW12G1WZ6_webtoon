import { combineReducers } from 'redux';

import reducerChapters from './reducersChapters';
import reducerAuthentication from './reducersAuthentication'
import reducerMyFavorites from './reducerMyFavorites';
import reducerGetDetailManga from './reducerGetDetailManga'
import reducerGetChapterMangas from './reducerGetChapterMangas'
import reducerGetPages from './reducerGetPages'
import reducerGetMangaUser from './reducerGetMangaUser'
import reducerGetAllMangas from './reducerGetAllMangas'
import reducerMangas from './reducerMangas'

const appReducer = combineReducers({
  chapters : reducerChapters,
  authentication : reducerAuthentication,
  myFavorites : reducerMyFavorites,
  getDetailManga : reducerGetDetailManga,
  chapterMangas : reducerGetChapterMangas,
  pages : reducerGetPages,
  mangaUser :reducerGetMangaUser,
  allMangas : reducerGetAllMangas,
  mangas : reducerMangas
})

export default appReducer