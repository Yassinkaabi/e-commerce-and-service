const express = require ('express')
const app = express()
require ('dotenv').config()
//config database
const connectDB = require ('./config/connectDB')
connectDB()
//settings
app.use(express.json());
//Route
app.use('/api/user', require('./routes/userRoute'))
app.use('/api/products', require('./routes/productRoute'))
app.use('/api/order', require('./routes/orderRoute'))


app.listen(process.env.Port,(err) => 
    err? 
    console.log(err) 
    :console.log(`server is running on localhost ${process.env.Port}`)

)