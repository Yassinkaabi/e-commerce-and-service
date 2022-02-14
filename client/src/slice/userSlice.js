import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
//register action
export const registerUser = createAsyncThunk ('user/registerUser',async(info,{rejectWithValue})=>{
    try {
      const {data} = await axios.post('http://localhost:5000/api/user/register',info.data)
        info.navigate('/Login')
        return data ;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
})
//login action
export const loginUser = createAsyncThunk ('user/loginUser',async(info,{rejectWithValue})=>{
    try {
      const {data} = await axios.post('http://localhost:5000/api/user/login',info.data)
        data.role==='user'? info.navigate('/') : data.role==='admin' ?  info.navigate('/Dashboard') :  info.navigate('/Technicien') 
        
        return data ;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    } 
})

//load user info action
export const loadUserInfo = createAsyncThunk ('user/loadUserInfo',async(info,{rejectWithValue})=>{
    try {
      const {data} = await axios.get('http://localhost:5000/api/user/userInfo',{
          headers:{
              token: localStorage.getItem('token')
          },
      })        
        return data ;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    } 
})

const userSlice = createSlice({
    name: 'user',
    initialState:{
       userInfo: {},
       token:localStorage.getItem('token') || null,
       isAuth:localStorage.getItem('isAuth') ||false,
       errors: null,
       role: localStorage.getItem('role') || ''
    },
    reducers:{
        logout: (state) =>{
            state.token=null;
            state.isAuth=false;
            state.role='',
            localStorage.removeItem('token'),
            localStorage.removeItem('isAuth'),
            localStorage.removeItem('role')
        },
    },
    extraReducers:{
        [registerUser.fulfilled]:(state,action)=>{
            state.msg=action.payload.msg
        },
        [registerUser.rejected]:(state,action)=>{
            state.errors=action.payload
        },
        [loginUser.fulfilled]:(state,action)=>{
            state.isAuth=true;
            localStorage.setItem('isAuth', true);
            state.token=action.payload.token
            state.role=action.payload.role
            localStorage.setItem('role', action.payload.role)
            localStorage.setItem('token',action.payload.token)
        },
        [loginUser.rejected]:(state,action)=>{
            state.errors=action.payload
        },
        [loadUserInfo.fulfilled]:(state,action)=>{
            state.userInfo=action.payload
        },
        [loadUserInfo.rejected]:(state,action)=>{
            state.errors=action.payload
        },
    }
});

export default userSlice.reducer
export const {logout} = userSlice.actions;