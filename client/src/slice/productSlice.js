import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

//register product action
export const registerProduct = createAsyncThunk ('product/registerProduct',async(info,{rejectWithValue})=>{
    try {
      const {data} = await axios.post('/api/products/register',info.data)
        /* data.role==='admin'*/ info.navigate('/Product') 
        return data ;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    } 
})
//get product action
export const getProduct = createAsyncThunk ('user/getProduct',async(info,{rejectWithValue})=>{
    try {
      const {data} = await axios.get('/api/products',info.data)
       info.navigate('/Product') 
        return data ;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
})
const productSlice = createSlice({
    name: 'product',
    initialState:{
       productInfo: {},
       productList:[],
       errors:null
    },
    reducers:{
        greeting: (state,action) =>{
            state.msg=action.payload
        },
    },
    extraReducers:{

        [getProduct.fulfilled]:(state,action)=>{
            state.isAuth=true;
            localStorage.setItem('isAuth', true);
            state.token=action.payload.token
            state.role=action.payload.role
            localStorage.setItem('role', action.payload.role)
            localStorage.setItem('token',action.payload.token)
        },
        [getProduct.rejected]:(state,action)=>{
            state.errors=action.payload
        }
    }
});


export default productSlice.reducer