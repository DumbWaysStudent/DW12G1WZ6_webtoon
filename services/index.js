require('express-group-routes')

const fs = require('fs')

const express = require('express')
const bodyParser = require('body-parser')
const mkdirp = require('mkdirp')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        const dirCoverManga = 'uploads/cover/'
        mkdirp(dirCoverManga.toString(),null)
        cb(null,dirCoverManga)
    },
    filename : function(req, file, cb){
        const dirCoverManga = 'uploads/cover/'
        mkdirp(dirCoverManga.toString(),null)
        cb(null,file.originalname)
    }
})
const upload = multer({storage:storage})

const storageImage = multer.diskStorage({
    destination: function(req, file, cb){
        const dirPageManga = 'uploads/page/'
        mkdirp(dirPageManga.toString(),null)
        cb(null,dirPageManga)
    },
    filename : function(req, file, cb){
        const dirPageManga = 'uploads/page/'
        mkdirp(dirPageManga.toString(),null)
        cb(null,file.originalname)
    }
})
const uploadImage = multer({storage:storageImage})

const app = express()
const port = 5000
app.use('/mangaky/uploads/cover/',express.static('uploads/cover'))
app.use('/mangaky/uploads/page/',express.static('uploads/page'))
app.use(bodyParser.json())

const mangasController = require('./controller/mangasController')
const imagesController = require('./controller/imagesController')
const authController = require('./controller/authController')
const authenticating = require('./middleware')
const favoritesController = require('./controller/favoritesController')


app.group("/mangaky",(router) => {
    // manga API
    router.get('/manga',mangasController.index) // tampil semua manga
    router.get('/manga/mycreation/user/:id',authenticating,mangasController.myCreation) // tampil manga user
    router.post('/manga/add/:userId',upload.single('cover'),mangasController.addMangas)// tambah manga user
    router.put('/manga/update/:mangaId',mangasController.updateManga)// update manga berdasarkan id
    router.delete('/manga/delete/:mangaId',mangasController.deleteManga)//hapus manga
    router.get('/manga/search/:title',authenticating,mangasController.searchTitle)// cari manga berdassarkan judul
    router.get('/manga/read/manga/:mangaId/chapter/:idChapter',imagesController.show)// baca manga
    router.get('/manga/search/id/:mangaId',mangasController.searchMangas)// cari manga berdasarkan id
    router.get('/manga/user/:idUser',mangasController.mangaUsers)//ambil manga user
    router.get('/manga/recommendation',mangasController.mangaRecommendation)

    // favorite API
    router.get('/manga/favorite/:id',favoritesController.show)// tampil manga favorit user
    router.post('manga/favorite/add/:idUser',authenticating,favoritesController.addFavorite)// tambah manga favorit user
    router.delete('/manga/favorite/delete/user/:idUser/manga/:idManga',authenticating,favoritesController.deleteFavorite)// hapus favorit manga user


    // chapter API
    router.get('/chapter/manga/:mangaId',authenticating,mangasController.showChapter)// tampil semua chapter manga
    router.post('/chapter/create/:mangaId',mangasController.createChapter)// buat chapter manga
    router.put('/chapter/update/manga/:mangaId/chapter/:chapterId',authenticating,mangasController.updateChapter)// update chapter manga
    router.delete('/chapter/delete/:chapterId',authenticating,mangasController.deleteChapter)// hapus chapter manga
    router.get('/chapter/latest',mangasController.getLastestChapters)

    // image API
    router.get('/chapter/page/:idChapter',authenticating,imagesController.show)
    router.post('/chapter/mangaId/:id/image/add',uploadImage.single('image'),mangasController.createImageChapter)// tambah page chapter
    router.delete('/chapter/image/delete/:id',authenticating,mangasController.deleteImageChapter)// hapus page chapter
    
    // Authentication API
    router.post('/register',authController.register)// signup
    router.post('/login',authController.login)// login


    // router.get('/mangas',mangasController.index)
})

app.listen(port, () => console.log(`Listening on port ${port}!`))