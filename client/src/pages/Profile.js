import {useEffect} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { loadUserInfo } from '../slice/userSlice';

const Profile = () => {
  const dispatch = useDispatch()
  const {firstName,lastName, email,address,profilePicture} = useSelector((state)=>state.user.userInfo)
  useEffect(()=>{
    dispatch(loadUserInfo())
  },[])
  return <div >  
        <img src={profilePicture} width='200px'/><br/>
        <input type='file'/>
        <p>{firstName}</p>
        <p>{lastName}</p>
        <p>{email}</p>
        <p>{address}</p>

         </div>;
};

export default Profile;
