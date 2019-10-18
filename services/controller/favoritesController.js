const models = require ('../models')
const favorites = models.favorite
const myFavorites = models.myFavorites

exports.show = async (req,res) =>{
    const dataFavorite = await favorites.findAll({
        where:{
            user:req.params.id
        }
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
exports.myFavorites = async (req,res) =>{
    const dataFavorite = await myFavorites.findAll({
       where:{
           user : req.params.idUser
       }
    })
    res.send(dataFavorite)
}