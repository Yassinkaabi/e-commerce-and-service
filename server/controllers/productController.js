const Product = require ('../models/productModel')

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const registerProduct = async(req,res)=>{
    try {

        const {user,name, description,category, price, image, quantity } = req.body;
         const newProduct = await Product.create({user,name, description,category, price, image, quantity})
        res.json(newProduct)
        //  res.status(201).json({msg : 'Product created'});
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : `something went wrong`})
    }
}
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProduct = async(req,res)=>{
    try {
         const newProduct = await Product.find()
        res.json(newProduct)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : `something went wrong`})
    }
}

// @desc    get product by id
// @route   GET /api/products/id
// @access  Public
const getProductById = async(req,res)=>{
    try {
         const newProduct = await Product.findById(req.params.id)
         if(Product)
        res.json(newProduct)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : `something went wrong`})
    }
}

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
	const {Name, Description,Category, Price, Image, Quantity} = req.body

	const product = await Product.findById(req.params.id)
	if (product) {
		product.Name = Name
		product.Description = Description || product.Description
		product.Category = Category || product.category
		product.Price = Price
		product.Image = Image || product.Image
		product.Quantity = Quantity

		const updatedProduct = await product.save()
		res.status(201).json(updatedProduct)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
}

// @desc    Delete single product by id
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req,res)=> {
    try {
        const product = await Product.findByIdAndRemove(req.params.id)
        res.json({msg : 'product removed'})
    } catch (error) {
        console.log(error)
        res.status(404).json({msg : `something went wrong`})
    }
}

// @desc    Get sorted Name products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = async (req, res) => {
	// Find products and sort by Name in ascending order
	const products = await Product.find().sort({ Name: -1 }).limit()

	res.json(products)
}

module.exports= {registerProduct,updateProduct,getProduct,getProductById,deleteProduct,getTopProducts}