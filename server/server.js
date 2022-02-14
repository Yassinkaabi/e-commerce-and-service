const express = require ('express')
const app = express()
const path = require ('path')
require ('dotenv').config()
//config database
const connectDB = require ('./config/connectDB')
connectDB()
//settings
app.use(express.json());
const cors = require ('cors')
app.use(cors('https://localhost:3000'));
//Route
app.use('/api/user', require('./routes/userRoute'))
app.use('/api/products', require('./routes/productRoute'))
app.use('/api/order', require('./routes/orderRoute'))

app.use('/uploads',express.static(path.join(__dirname, '../' , 'img-uploads')))

app.listen(process.env.Port,(err) => 
    err? 
    console.log(err) 
    :console.log(`server is running on localhost ${process.env.Port}`)

)