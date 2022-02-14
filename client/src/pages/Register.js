import React from 'react';
import { useForm } from "react-hook-form";
import {useDispatch, useSelector} from 'react-redux'
import { registerUser } from '../slice/userSlice';
import {useNavigate} from 'react-router-dom'
const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {errors: errorUser}=useSelector((state) => state.user)

    const userInfo = (data)=>{
        dispatch(registerUser({data,navigate}));
    } 
  return <div>
      <form onSubmit={handleSubmit(userInfo)}>
          <label htmlFor='' >firstName: </label>
          <input type='text' {...register("firstName" ,{required: true } )}/><br/><br/>
          <label htmlFor='' >lastName: </label>
          <input type='text' {...register("lastName", {required: true })}/><br/><br/>
          <label htmlFor='' >Email: </label>
          <input type='text' {...register("email" , {required: true ,
          pattern:{
            value:/[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/ ,
            message:"you should input a valid email" },
            })}/>
          {errors.Email?.message}
          <br/><br/>
          <label htmlFor='' >Password: </label>
          <input type='password' {...register("password" , {required: true , minLength:{
              value:6,
              message:"you should be of 6 caracters at least"
          }})}/>
          {errors.Password?.message}
          <br/><br/>
          <label htmlFor='' >Address: </label>
          <input type='text' {...register("address", {required: true })}/><br/><br/>
          <label htmlFor='' >Pays: </label>
          <input type='text' {...register("pays", {required: true })}/><br/><br/>
          <label htmlFor='' >City: </label>
          <input type='text' {...register("city", {required: true })}/><br/><br/>
          <label htmlFor='' >postalCode: </label>
          <input type='text' {...register("postalCode", {required: true })}/><br/><br/>
          {errorUser && errorUser}<br/>
          <button>Register</button>
      </form>
  </div>;
};

export default Register;
