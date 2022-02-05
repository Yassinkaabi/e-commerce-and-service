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
module.exports= {registerOrder}