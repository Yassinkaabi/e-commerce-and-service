import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder } from '../../slice/OrderSlice'
import { useNavigate } from 'react-router'

const OrderScreen = () => {
	const dispatch = useDispatch()
    const navigate = useNavigate()
	const { loading, error, pastOrders } = useSelector((state) => state.order)
	const { userInfo, role } = useSelector((state) => state.user)

	useEffect(() => {
		if (userInfo && role === 'admin') {
			dispatch(getOrder())
		} else {
			navigate('/Login')
		}
	}, [dispatch, userInfo])

	return (
		<>
			<h1>Orders</h1>
			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<h1 variant='danger'>{error}</h1>
			) : (
				<table bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>User</th>
							<th>Date</th>
							<th>Total</th>
							<th>Validate</th>
							<th>Info</th>
						</tr>
					</thead>
					<tbody>
						{pastOrders.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.user && order.user.name}</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								<td>{order.totalPrice}Dt</td>

								<td>
									{order.validate ? (
										order.validate.substring(0, 10)
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>

								<td>
									<div to={`/order/${order._id}`}>
										<button className='btn-sm' variant='light'>
											Details
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</>
	)
}

export default OrderScreen
