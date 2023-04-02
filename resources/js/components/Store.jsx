import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from '@inertiajs/react';

function Store() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [msg, setMessg] = useState('');
  const [id_user,setIdUser]=useState();
  const navigate=useNavigate();

  
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  useEffect(()=>{
    setIdUser(localStorage.getItem('id_user'));
    console.log(id_user);
  },[])
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    
    formData.append("image", image);
    formData.append("title", title);
    formData.append("user_id",id_user );
    axios.post('/api/uplode-image', formData)
    .then((response) => { 
      setMessg(response.data.msg);
      navigate('/')
      }).catch(err => console.log(err))
  };

  return (
    
    <div className='mt-16 py-10 m-auto flex flex-col gap-y-5 w-11/12 xl:w-5/12  rounded-lg  justify-center items-center bg-white shadow-xl'>
      {id_user ===null?<div>
        <span className='text-xl m-auto'>Please Logged in And Create Your Store <br /> <a href='/login' className='text-center text-xl hover:underline'><p className='text-center'>login</p></a></span>
      </div>:
      <form className='w-full flex flex-col gap-y-4'>

      <div >
        <h1 className='text-center text-4xl font-bold mb-8'>Create Your Store</h1>
      
        <input type="file" id='file' className='border-2 w-11/12 ml-4 xl:ml-5  outline-none focus:outline-none  ' onChange={handleImageChange} />
      </div>
      
      
      
      <div>
      
        <input
          type="text"
          className='w-11/12 ml-4 xl:ml-5 rounded-md'
          placeholder='Name Of Your Store'
          name='title'
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      
      <div>
        <p className='text-green-800 font-bold text-lg'>{msg}</p>
      </div>
      <button type="submit" onClick={handleSubmit} className='bg-slate-950 ml-4 xl:ml-5 outline-none px-5 w-11/12 text-2xl text-gray-100 py-1 rounded-xl'>Upload</button>
      </form>
      }
      
    </div>
  );

}

export default Store
