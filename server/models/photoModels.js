const mongoose=require("mongoose")
const photosSchama=new mongoose.Schema({
    title:{
        type:String,
    },
    imageUrl:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('photos',photosSchama)