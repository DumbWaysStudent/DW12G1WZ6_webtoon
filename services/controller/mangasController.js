const sequelize = require('sequelize')
const models = require ('../models')
const mangas = models.manga
const chapters = models.chapter
const lastestChapters = models.lastestChapters
const Op = sequelize.Op

//manga

//tampil semua data manga
exports.index =async (req,res) => {
    
    const dataMangas = await mangas.findAll({})
    res.send(dataMangas)
}

exports.searchMangas = async ( req,res) =>{
    const dataMangas = await mangas.findAll({
        where:{
            id:req.params.mangaId
        }
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
    const {userId} = req.params
    const {title,genre,cover} = req.body
    const dataManga = await mangas.create({
        title,
        genre,
        cover,
        author : userId
    })
    res.send(dataManga)
}
exports.updateManga = async (req,res) => {
    const mangaId = req.params.mangaId
    const data = req.body
    const dataManga = await mangas.update(data,{
        where:{
            id : mangaId 
        }
    })
    res.send(data)
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
        manga: mangaId
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
    const {image,title} = req.body
    const dataChapter = await chapters.create({
        manga : mangaId,
        image,
        title
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
    const dataChapter = await lastestChapters.findAll()
    res.send(dataChapter)
}
// images chapter

exports.createImageChapter = async (req,res) =>{
    const data = req.body
    const dataImageChapter = await imageChapter.create({
        data
    })
    res.send(data)
}

exports.deleteImageChapter = async (req,res) =>{
    const imageChapterId = req.params.imageChapterId
    const dataImageChapter = await chapters.destroy({
        where:{
         id:imageChapterId
        }
    })
    res.send(imageChapterId)

}
