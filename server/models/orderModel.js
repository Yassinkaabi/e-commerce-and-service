const mongoose =require  ('mongoose')

// Create Order Schema
const orderSchema = mongoose.Schema(
{
		user: {
			type: mongoose.Schema.Types.ObjectId, // Gets id of User
			required: true,
			ref: 'User', // Adds relationship between Order and User
		},
		orderItems: [
			{
				name: { type: String, required: true },
				quantity: { type: Number, required: true },
				image: { type: String, required: true },
				price: { type: Number, required: true },
				product: {
					type: mongoose.Schema.Types.ObjectId, // Gets id of Product
					required: true,
					ref: 'Product', // Adds relationship between Order and Product },
				},
			},
		],
        
		paymentMethod: {
			type: String,
			required: true,
		},
		paymentResult: {
			id: { type: String },
			status: { type: String },
			update_time: { type: String },
			email_address: { type: String },
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		isPaid: {
			type: Boolean,
			required: true,
			default: false,
		},
		paidAt: {
			type: Date,
		},
		
})

module.exports = mongoose.model('Order', orderSchema)


