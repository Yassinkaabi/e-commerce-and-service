const express = require ('express')
const router = express.Router()
const {registerOrder} = require ('../controllers/orderController')

router.post('/register',registerOrder)

module.exports = router