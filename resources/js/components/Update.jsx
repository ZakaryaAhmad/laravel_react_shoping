import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function Update() {
    const { id } = useParams();
    const { idStore } = useParams();
    const [name, setName] = useState();
  const [image, setImage] = useState();
  const [desc, setDesc] = useState();
  const [price, setPrice] = useState();
  const [location, setLocation] = useState();
  const [show,setShow]=useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("idStore", idStore);
    axios.post('/api/update/'+id, formData).then((response) => { setShow(response.data.msg) }).catch(err => console.log(err))
  };
  

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };



    return (
        <div>
            <form className='flex flex-col gap-y-4 bg-white shadow-2xl rounded-md w-11/12 xl:w-4/12 m-auto py-8 mt-24'>
            <div>
          <h1 className='font-bold text-4xl  ml-7'>Update Item</h1>
        </div>
        <div>
          <input
            type="text"
            placeholder='Name Product'
            className='w-10/12 ml-8 rounded-md'
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <input type="text" onChange={(e) => setDesc(e.target.value)} placeholder='description' className='w-10/12 ml-8 rounded-md' name="desc" />
        </div>

        <div>
          <input type="number" onChange={(e) => setPrice(e.target.value)} placeholder='Price' className='w-10/12 ml-8 rounded-md' name="price" />
        </div>

        <div>
          <input type="text" placeholder='Location' onChange={(e) => setLocation(e.target.value)} className='w-10/12 ml-8 rounded-md' name="location" />
        </div>

        <div>
          <input type="file" id='file'  className='w-10/12 ml-8 rounded-md border-2' onChange={handleImageChange} />
        </div>

        


        <div className='flex justify-between mr-7 xl:mr-14 '>
          <div>
             <p className='ml-9 text-xl text-green-700'>{show}</p>
          </div>
          <button type="submit" onClick={handleSubmit} className='bg-sky-800 text-lg hover:bg-sky-700 duration-200 cursor-pointer text-gray-100 rounded-md tracking-wider py-1 px-2' >Update Item</button>
        </div>

            </form>
        </div>

    )
}

export default Update
