import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

//register order action 
export const createOrder = createAsyncThunk ('order/createOrder',async(info,{rejectWithValue,dispatch})=>{
    console.log(info)
    try {

      const {data} = await axios.post('/api/order/register',{
        headers:{
            token: localStorage.getItem('token')
        }
        },)
        // /* data.role==='admin'*/ info.navigate('/Product') 
        // return dispatch(getProduct())
        return data ;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    } 
})

//get order action
export const getOrder = createAsyncThunk ('order/getOrder',async(info,{rejectWithValue})=>{
    try {
      const {data} = await axios.get('/api/order',{
        headers:{
            token: localStorage.getItem('token')
        }
        },)
        return data ;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
})

const orderSlice = createSlice({
	name: 'order',
	initialState: {
		pastOrders: [],
		currentOrder: JSON.parse(localStorage.getItem('order')) || {},
		paymentMethod: JSON.parse(localStorage.getItem('order'))?.paymentMethod || '',
		address: JSON.parse(localStorage.getItem('order'))?.shippingAddress || {},
	},
	reducers: {
		currentOrderHandler(state, action) {
			console.log(action.payload);
			localStorage.setItem('order', JSON.stringify(action.payload.order));
			state.currentOrder = action.payload.order;
		},
		pastOrdersHandler(state, action) {},
		orderSuccess(state, action) {},
		orderFailed(state, action) {},
	},
});

/*export const order = () => {
    return (dispatch) => {

        
    };
} */
export const orderActions =orderSlice.actions;
export default orderSlice.reducer