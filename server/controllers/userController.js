const User = require ('../models/userModel')
const bcrypt = require ('bcryptjs')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

//@desc register as a user
//@route POST /api/user/register
//@access public
const register = async(req,res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }

        const {firstName,lastName , email, password , address, pays, city, postalCode} = req.body;

         const existUser = await User.findOne({email})

         if(existUser) return res.status(400).json({msg : 'you have already registred'})

         if(password.length < 6) return res.status(400).json({msg : ' password is at least 6 caracters long '})

         const hadshedPassword= await bcrypt.hash(password, 10)
         const newUser = await User.create({firstName,lastName, email, password:hadshedPassword,address,pays,city,postalCode})
        // res.json(newUser)
         res.status(201).json({msg : 'user created'});
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : `something went wrong`})
    }
}
//@desc login as a user
//@route POST /api/user/login
//@access public

const login = async(req,res)=>{
    try {
        const {email, password} = req.body;
        const existUser = await User.findOne({email})
        if (!existUser) return res.status(400).json({msg : 'you have to register first.'})
        const validatePassword= await bcrypt.compare(password,existUser.password)
        if (!validatePassword) return res.status(400).json({msg : 'wrong password'})
        const token = await jwt.sign({sub: existUser._id },process.env.SECRET_KEY,{expiresIn:'30d'})
        res.json({token,role: existUser.role});
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : `something went wrong`})
    }

}
//@desc load user info
//@route POST /api/user/personInfo
//@access private, owner
const loadUserInfo =  async(req,res) => {
    try {
        const userInfo = await User.findById(req.userId).select('-password');
        res.json(userInfo)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : `something went wrong`})
    }
}

// @desc    Fetch all users
// @route   GET /api/user/
// @access  Public
const getAllUsers = async(req,res)=>{
    try {
         const user = await User.find().select('-password')
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : `something went wrong`})
    }
}
// @desc    get user by id
// @route   GET /api/products/id
// @access  Public
const getUserById = async(req,res)=>{
    try {
         const user = await User.findById(req.params.id).select('-password')
         if(User)
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : `something went wrong`})
    }
}

// @desc    get user by id
// @route   GET /api/products/id
// @access  Public
const updateUserById = async(req,res)=>{
   
        const {firstName,lastName , email, password , address, pays, city, postalCode} = req.body;
         const user = await User.findById(req.params.id).select('-password')
         if(user) {
         user.firstName= firstName
         user.lastName=lastName
         user.email=email || user.email
         user.password=password || user.password
         user.address=address || user.address
         user.pays=pays || user.pays
         user.city=city || user.city
         user.postalCode=postalCode || user.postalCode

		const updateUser = await user.save()
         
        res.status(200).json(updateUser)
         }else {
            res.status(404)
            throw new Error('User not found')
        }
}
// @desc    Delete single product by id
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteUser = async (req,res)=> {
    try {
        const user = await User.findByIdAndRemove(req.params.id)
        res.json({msg : 'user removed'})
    } catch (error) {
        console.log(error)
        res.status(404).json({msg : `something went wrong`})
    }
}

//@desc load user profile picture
//@route POST /api/user/profilePic
//@access private, owner
const updateProfilePicture =  async(req,res) => {
    try {
        console.log(req.file)
        res.json({msg :'hi'})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : `something went wrong`})
    }
}
module.exports= {register,login,loadUserInfo,getAllUsers,getUserById,updateUserById,deleteUser,updateProfilePicture}