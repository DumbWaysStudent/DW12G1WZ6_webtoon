require('express-group-routes')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 5000

app.use(bodyParser.json())

const mangasController = require('./controller/mangasController')
const imagesController = require('./controller/imagesController')
const authController = require('./controller/authController')
const authenticating = require('./middleware')
const favoritesController = require('./controller/favoritesController')


app.group("/mangaky",(router) => {
    // manga API
    router.get('/manga',authenticating,mangasController.index) // tampil semua manga
    router.get('/manga/mycreation/user/:id',authenticating,mangasController.myCreation) // tampil manga user
    router.post('/manga/add/:userId',authenticating,mangasController.addMangas)// tambah manga user
    router.put('/manga/update/:mangaId',authenticating,mangasController.updateManga)// update manga berdasarkan id
    router.delete('/manga/delete/:mangaId',authenticating,mangasController.deleteManga)//hapus manga
    router.get('/manga/search/:title',authenticating,mangasController.searchTitle)// cari manga berdassarkan judul
    router.get('/manga/read/manga/:mangaId/chapter/:idChapter',authenticating,imagesController.show)// baca manga
    router.get('/manga/search/:mangaId',mangasController.searchMangas)// cari manga berdasarkan id

    // favorite API
    router.get('/manga/favorite/:id',authenticating,favoritesController.show)// tampil manga favorit user
    router.post('manga/favorite/add/:idUser',authenticating,favoritesController.addFavorite)// tambah manga favorit user
    router.delete('/manga/favorite/delete/user/:idUser/manga/:idManga',authenticating,favoritesController.deleteFavorite)// hapus favorit manga user
    router.get('/manga/myfavorites/:idUser',favoritesController.myFavorites)

    // chapter API
    router.get('/chapter/manga/:mangaId',authenticating,mangasController.showChapter)// tampil semua chapter manga
    router.post('/chapter/create/:mangaId',authenticating,mangasController.createChapter)// buat chapter manga
    router.put('/chapter/update/manga/:mangaId/chapter/:chapterId',authenticating,mangasController.updateChapter)// update chapter manga
    router.delete('/chapter/delete/:chapterId',authenticating,mangasController.deleteChapter)// hapus chapter manga
    router.get('/chapter/latest',mangasController.getLastestChapters)

    // image API
    router.post('chapter/mangaId/:id/image/add',authenticating,mangasController.createImageChapter)// tambah page chapter
    router.delete('chapter/image/:id',authenticating,mangasController.deleteImageChapter)// hapus page chapter
    
    // Authentication API
    router.post('/register',authController.register)// signup
    router.post('/login',authController.login)// login


    // router.get('/mangas',mangasController.index)
})

app.listen(port, () => console.log(`Listening on port ${port}!`))