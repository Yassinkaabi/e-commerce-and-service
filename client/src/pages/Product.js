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
    return(
        <div className='product-view'>

        </div>
    );
}