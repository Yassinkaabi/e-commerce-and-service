import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate,Link} from 'react-router-dom'
import { registerProduct } from '../../slice/productSlice';

const CreateProduct = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {errors: errorProduct}=useSelector((state) => state.product)
    const [productInformation,setProductInformation] = useState({});
    const [file,setFile]= useState ({});

    const handleChange = (e) => {
        setProductInformation ({...productInformation,[e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerProduct({productInformation,file}))
        navigate("/Product")
        }; 

return <div className="login-page">
    <form>
        <h2>Create product</h2>
        <input type='text' name='name' placeholder="name"  onChange={handleChange}/><br/><br/>
        <input type='text' name='description' placeholder='description' onChange={handleChange}/><br/><br/>
        <input type='text' name='price' placeholder='price' onChange={handleChange}/><br/><br/>
        <input type='file' name='file'  onChange={(e)=>setFile(e.target.files[0])}/><br/><br/>
        {errorProduct && errorProduct}<br/>
        <button onClick={handleSubmit} >Add product</button>           
    </form>
</div>;
};

export default CreateProduct;
