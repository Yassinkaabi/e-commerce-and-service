const express = require ('express')
const router = express.Router()
const {registerOrder,getOrder,deleteOrder} = require ('../controllers/orderController')

router.post('/register',registerOrder)
.get('/',getOrder)
.delete('/:id',deleteOrder)
module.exports = router