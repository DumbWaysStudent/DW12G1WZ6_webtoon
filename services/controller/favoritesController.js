const sequelize = require('sequelize')
const models = require ('../models')
const favorites = models.favorite
const myFavorites = models.myFavorites
const manga =models.manga

exports.show = async (req,res) =>{
    const dataFavorite = await favorites.findAll({
        where:{
            user:req.params.id
        },
        include: [{
            model: manga,
            as: "mangas",
        }],
    })
    res.send(dataFavorite)
}
exports.addFavorite = async (req,res) =>{
    const data = req.body
    const dataFavorite = await favorites.create({
        data
    })
    res.send(dataFavorite)
}
exports.deleteFavorite = async (req,res) =>{
    const manga = req.params.manga
    const user = req.params.idUser
    const dataFavorite = await favorites.destroy({
        where :{
            manga:manga,
            user : user
        }
    })
    req.send(user)
}
