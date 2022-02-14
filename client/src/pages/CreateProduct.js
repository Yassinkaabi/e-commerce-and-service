import React from 'react';
import { useForm } from "react-hook-form";
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { registerProduct } from '../slice/productSlice';
const CreateProduct = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { register:productInfo, handleSubmit, formState: { errors } } = useForm();
    const {errors: errorProduct}=useSelector((state) => state.product)

    const userInfo = (data)=>{
        dispatch(registerProduct({data,navigate}));
    } 
  return <div>
      <form onSubmit={handleSubmit(userInfo)}>
          <label htmlFor='' >name: </label>
          <input type='text' {...productInfo("name" ,{required: true } )}/><br/><br/>
          <label htmlFor='' >description: </label>
          <input type='text' {...productInfo("description", {required: true })}/><br/><br/>
          <label htmlFor='' >category: </label>
          <input type='text' {...productInfo("category", {required: true })}/>
          <br/><br/>
          <label htmlFor='' >price: </label>
          <input type='text' {...productInfo("price", {required: true })}/><br/><br/>
          <label htmlFor='' >image: </label>
          <input type='text' {...productInfo("image", {required: true })}/><br/><br/>
          <label htmlFor='' >quantity: </label>
          <input type='text' {...productInfo("quantity", {required: true })}/><br/><br/>

          {errorProduct && errorProduct}<br/>
          <button>Add product</button>
      </form>
  </div>;
};

export default CreateProduct;
