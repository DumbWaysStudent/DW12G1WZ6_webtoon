const models = require ('../models')
const images = models.image

exports.index =async (req,res) => {
    const dataImages = await images.findAll({})
    res.send(dataImages)
}

exports.show = async(req,res) => {
    chapterId = req.params.idChapter
    mangaId = req.params.mangaId
    const chapterImages = await images.findAll({
        where:{
            chapter : chapterId,
            manga : mangaId
        }
    })
    res.send(chapterImages)
}