const mongoose = require ('mongoose')

const userSchema = mongoose.Schema({
    firstName :{
        type: String,
        required: true,

    },
    lastName :{
        type: String,
        required: true,
    },
    email :{
        type: String,
        required: true,
        unique:true
        
    },
    password :{
        type: String,
        required: true,
        
    },
    address :{
        type: String,
        required: true,
    },
    pays :{
        type: String,
        required: true,
    },
    city :{
        type: String,
        required: true,
    },
    postalCode :{
        type: Number,
        required: true,
    },
    role :{
        type: String,
        enum: ['user', 'admin','technicien'],
        default: 'user'
        
    },
    Picture:{
        type: String,
        default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    }
})
module.exports = mongoose.model('User', userSchema)