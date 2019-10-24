const sequelize = require('sequelize')
const models = require ('../models')
const mangas = models.manga
const chapters = models.chapter
const lastestChapters = models.lastestChapters
const users = models.users
const Op = sequelize.Op
const imagesChapter = models.image

//manga

//tampil semua data manga
exports.index =async (req,res) => {
    
    const dataMangas = await mangas.findAll({})
    res.send(dataMangas)
}

exports.mangaRecommendation = async (req,res) => {
    const dataMangas = await mangas.findAll({order: sequelize.literal('rand()'), limit: 5})
    res.send(dataMangas)
}

exports.mangaUsers = async (req,res) =>{
    const dataMangas = await mangas.findAll({
        where:{
            author:req.params.idUser
        }
    })
    res.send(dataMangas)
}

exports.searchMangas = async ( req,res) =>{
    const dataMangas = await mangas.findAll({
        where:{
            id:req.params.mangaId
        },
        include: [{
            model: users,
            as: "users"
        }],
    })
    res.send(dataMangas)
}

//tampil manga yg dibuat user
exports.myCreation = async (req,res) =>{
    const dataManga = await mangas.findAll({
        where:{
            author:req.params.id
        }
    })
    res.send(dataManga)
}

//tampil manga berdasarkan title
exports.searchTitle = async (req,res) => {
    const dataManga = await mangas.findAll({
        where:{
            title:{[Op.like]:`%${req.params.title}%`}
        }
    })
    res.send(dataManga)
}
exports.addMangas = async (req,res) => {
    console.log(req.body.title)
    const {userId} = req.params
    const {title,genre} = req.body
    const dataManga = await mangas.create({
        title,
        genre,
        cover : req.file.path,
        author : userId
    })
    res.send(req.file.path)
}
exports.updateManga = async (req,res) => {
    const mangaId = req.params.mangaId
    const {title,genre} = req.body
    const dataManga = await mangas.update(
    {
        title,
        genre,
        cover : req.file.path,
    },
    {
        where:{
            id : mangaId 
        }
    })
    res.send(req.file.path)
}
exports.deleteManga = async (req,res) => {
    const mangaId = req.params.mangaId
    const dataManga = await mangas.destroy({
        where : {
            id:mangaId
        }
    })
    res.send(mangaId)
}

// Chapter
exports.showChapter = async (req,res) => {
    const mangaId = req.params.mangaId
    const dataChapter = await chapters.findAll({
        where : {
            manga: mangaId
        }
    })
    res.send(dataChapter)
}

exports.showLastestChapter = async(req,res) =>{
    const dataChapter = await chapters.findAll({
        order : [
            ['updatedAt','DESC']
        ]
    })
    res.send(dataChapter)
}

exports.createChapter = async (req,res) => {
    const mangaId = req.params.mangaId
    const {number,name} = req.body
    const dataChapter = await chapters.create({
        manga : mangaId,
        name,
        number
    })
    res.send(dataChapter)
}

exports.updateChapter = async (req,res) => {
    const mangaId = req.params.mangaId
    const chapterId = req.params.chapterId
    const {image,title} = req.body
    const  dataChapter = await chapters.update(
    {
        title,
        image,
        manga : mangaId,
        id : chapterId,
    },
    {
        where : {
            id:chapterId
        }
    })
    res.send(title,image,{'mangaId':mangaId})
}

exports.deleteChapter = async (req,res) =>{
    const chapterId = req.params.chapterId
    const dataChapter = await chapters.destroy({
        where:{
         id:chapterId
        }
    })
    res.send(chapterId)

}
exports.getLastestChapters = async (req,res) => {
    const dataChapter = await chapters.findAll({
        include: [{
            model: mangas,
            as: "mangas"
        }],
        order: [
            ['createdAt', 'DESC']
        ]
    })
        
    
    res.send(dataChapter)
}
// images chapter

exports.createImageChapter = async (req,res) =>{
    const {chapter,page} = req.body
    const idManga = req.params.id
    
        const dataImageChapter = await imagesChapter.create({
            chapter,
            image : req.file.path,
            page,
            manga : idManga
        })
        res.send(dataImageChapter)
    
        console.log('gak masuk')
    
  
}

exports.deleteImageChapter = async (req,res) =>{
    const imageChapterId = req.params.id
    const dataImageChapter = await imagesChapter.destroy({
        where:{
         id:imageChapterId
        }
    })
    res.send(imageChapterId)

}
