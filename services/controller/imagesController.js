const models = require ('../models')
const images = models.image

exports.index =async (req,res) => {
    const dataImages = await images.findAll({})
    res.send(dataImages)
}

exports.show = async(req,res) => {
    mangaId = req.params.mangaId
    chapterId = req.params.chapterId
    const chapterImages = await images.findAll({
        where:{
            manga : mangaId,
            chapter : chapterId
        }
    })
    res.send(chapterImages)
}