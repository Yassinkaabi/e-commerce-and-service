import { Col, Row, Container, ListGroup, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { orderActions } from '../../slice/OrderSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Paypal from './Payment';

const Order = () => {
	const { isAuth } = useSelector((state) => state.user);
	const { currentOrder: order } = useSelector((state) => state.order);
	const state = useSelector((state) => state.order);
	const cartState = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	// const [payment, setPayment] = useState('');
	const [checkout, setCheckOut] = useState(false);

	const { address, city, postalCode, country } = JSON.parse(localStorage.getItem('shippingAddress'));

	const placeOrderHandler = () => {
		console.log(checkout);
		setLoading(true);
		const sendCartData = async () => {
			try {
				const { data } = await axios.post(
					'/api/order/register',
					{
						...cartState,
						shippingAddress: {
							...JSON.parse(localStorage.getItem('shippingAddress')),
						},
						paymentMethod: checkout,
					},
					{
                        headers:{
                            token: localStorage.getItem('token')
                        },
					}
				);

				console.log(data);
				dispatch(orderActions.currentOrderHandler(data));
				setLoading(false);
				navigate(`/order/${JSON.parse(localStorage.getItem('order'))._id}`);
			} catch (error) {
				console.log(error.message);
			}
		};

		if (checkout) {
			sendCartData();
		}
	};

	console.log(JSON.parse(localStorage.getItem(state)));
	const orderItems = JSON.parse(localStorage.getItem('cartItems'))?.map((item) => {
		return (
			<div
				key={item._id}
				style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
				<table style={{border:'1px solid '}}>
					<tr>
					<td><img style={{ width:'30%' }} src={item.image} /></td>
					<td style={{ paddingRight: '15%' }}>{item.name}</td>
					<td style={{ marginLeft: '10px' }}>{item.price}Dt</td>
					<td style={{ marginLeft: '60px' }}>{item.quantity}</td>
					</tr>
				</table>
			</div>
		);
	});
console.log()
	return loading ? (
		<h2 style={{textAlign : 'center', marginTop : '40px'}}>Loading......</h2>
	) : (
		<>
			{isAuth ? (
				<>
					{state ? (
						<>
									<div style={{ width: '45rem' ,marginLeft:'25%' ,marginTop:'3rem' }}>
										<form>
										<div style={{marginBottom:'20px',border:'2px solid ',fontSize:'25px', color:'#53488d'}}>
											<h4 style={{color :'#030303',marginBottom:'10px',margin:'5px 0 5px 40%'}}>Shipping Details</h4>
											<div>
												<h6 style={{color:'#030303', marginLeft:'1rem' }}>
													Address - <span>{address}</span>
												</h6>
												<h6 style={{color:'#030303', marginLeft:'1rem' }}>
													Country - <span>{country}</span>
												</h6>
												<h6 style={{color:'#030303', marginLeft:'1rem' }}>
													City - <span>{city}</span>
												</h6>
												<h6 style={{color:'#030303', marginLeft:'1rem' }}>
													Postal Code - <span>{postalCode}</span>
												</h6>
											</div>
										</div>
										</form>
									<div style={{marginBottom:'20px',border:'2px solid',fontSize:'25px', color:'#53488d' }}>											
											<h4 style={{marginBottom:'10px',color:'#030303',margin:'5px 0 5px 40%'}}>Order Summary</h4>
											<div>
												<h6 style={{color:'#030303',marginLeft:'1rem' }}>
													Total Items - {JSON.parse(localStorage.getItem('cartItems')).length}
												</h6>
												<h6 style={{color:'#030303',marginLeft:'1rem' }}>
													Total Price - $
													{JSON.parse(localStorage.getItem('cartItems')).reduce((acc,curr)=>acc+(curr.price*curr.cartQuantity),0)}
												</h6>
											</div>
											<div class="form-check">
											{checkout ? (
       												 <Paypal />
   													   ) : (
											<button
											style={{margin:'25px'}}
   											onClick={() => {
												setCheckOut(true);
										}}
										>
										 <label class="form-check-label" for="flexRadioDefault1">
													Paypal <i class="fab fa-cc-paypal" style={{ color: 'blue',fontSize:'50px' }}></i>
												</label>
											</button>
											)}
									</div>
									</div>

								<div style={{ fontSize:'15px', color:'#53488d',borderBlockStyle:'solid',borderBlockColor:'ActiveBorder',marginBottom:'25px'  }}>
									<div style={{ width: '45rem', marginTop: '20px' }}>
									
											<h4 style={{color:'black',fontSize:'25px',margin:'5px 0 5px 40%'}}>Order Items  </h4>

											<h4 style={{color:'black'}}>{orderItems}</h4>
										
									</div>
								</div>
							</div>
						</>
					) : (
						<p>Loading</p>
					)}
				</>
			) : (
				<h3 style={{ textAlign: 'center', marginTop: '40px' }}>Please Sign In to Place Order!</h3>
			)}
		</>
	);
};

export default Order;
