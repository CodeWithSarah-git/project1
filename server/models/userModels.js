const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email:{
         type:mongoose.Schema.Types.String  
    },
    address:{
        type:mongoose.Schema.Types.String,
        default:"Seminar"
    },
    phone:{
        type:mongoose.Schema.Types.String,
        maxLength: 10
    }

})
module.exports = mongoose.model('user', userSchema)