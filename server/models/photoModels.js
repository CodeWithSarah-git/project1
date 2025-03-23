const mongoose=require('mongoose')
const photoSchema=new mongoose.Schema({
    title:{
        type:mongoose.Schema.Types.String,
        required:true
        },
        imageUrl:{
           type:String
        }  
})
module.exports = mongoose.model('photoSchema', photoSchema)