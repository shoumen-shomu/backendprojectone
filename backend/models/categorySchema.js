const mongoose = require('mongoose')
const {Schema} = mongoose


let CategorySchema = new Schema({
    name :{
        type :String,
        required : true,
        unique : true
    },

    status : {
        type : String,
        enum : ["active","deactive","reject"],
        default : "deactive"
    }
})

module.exports =mongoose.model ("Category",CategorySchema)