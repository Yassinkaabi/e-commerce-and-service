const express = require ('express');
const { register,login,loadUserInfo,getAllUsers,getUserById,updateUserById,deleteUser } = require('../controllers/userController');
const authMiddleware = require ('../middlewars/authMiddlewares')
const router = express.Router();
const userValidation = require ('../middlewars/userValidation');

router.post('/register',userValidation,register)
router.post('/login',userValidation,login)
router.get('/userInfo',authMiddleware,loadUserInfo)
.get('/',getAllUsers)
.get('/:id',getUserById)
.put('/:id',updateUserById)
.delete('/:id',deleteUser)

module.exports = router 