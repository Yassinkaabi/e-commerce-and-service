const Order = require ('../models/orderModel')

const registerOrder = async(req,res)=>{
    try {
        const {user, orderItems, paymentMethod, paymentResult, totalPrice, isPaid, paidAt} = req.body ;
        const newOrder = await Order.create({user, orderItems, paymentMethod, paymentResult, totalPrice, isPaid, paidAt} )
        res.status(201).json(newOrder)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : `something went wrong`})
    }
}

// @desc    Fetch all order
// @route   GET /api/order
// @access  Public
const getOrder = async(req,res)=>{
    try {
         const newOrder = await Order.find()
        res.json(newOrder)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : `something went wrong`})
    }
}
// @desc    Delete single order by id
// @route   DELETE /api/order/:id
// @access  Private/Admin
const deleteOrder = async (req,res)=> {
    try {
        const newOrder = await Order.findByIdAndRemove(req.params.id)
        res.json({msg : 'order removed'})
    } catch (error) {
        console.log(error)
        res.status(404).json({msg : `something went wrong`})
    }
}
module.exports= {registerOrder,getOrder,deleteOrder}