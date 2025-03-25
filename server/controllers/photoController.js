const Photos=require("../models/photoModels")

const createPhoto = async(req,res)=>{
    const {title,imageURL}=req.body
    if(!imageURL)
       return res.status(404).json({message:'there is a detail missing'})
    const photo = await Users.create({title,imageURL})
    res.json(photo)

}
const getAllPhotos=async (req, res) => {
    const photos = await Photos.find().lean()
    if (!photos?.length) {
    return res.status(400).json({ message: 'No photos found' })
    }
    res.json(photos)
    }

const updatePhoto= async (req, res) => {
    const {id}=req.params
    const {title,imageURL}= req.body
   
    if ( !imageURL) {
    return res.status(400).json({message: 'fields are required' })
    }
    
    const photo = await Photos.findById(id).exec()
    if (!photo) {
    return res.status(400).json({ message: 'photo not found' })
    }
    photo.title = title
    photo.imageUrl = imageUrl
    const updatedPhoto = await photo.save()
    res.json(`'${updatedPhoto.title}' updated`)
    }
const deletePhoto=async (req, res) => {
    const { id } = req.params
    const photo = await Photos.findById(id).exec()
    if (!photo) {
    return res.status(400).json({ message: 'photo not found' })
    }
    const reply=`photo '${photo.title}' ID ${photo.id} deleted`
    const result = await photo.deleteOne()
    res.json(reply)
    }
    module.exports = {
        createPhoto,
        getAllPhotos,
        updatePhoto,
        deletePhoto
        }