import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Home() {

  const [apiStore, setApiStore] = useState([]);
  const [display, setDisplay] = useState(false);
  const [loader, setLoader] = useState(false);
  const [deleteItem] = useState('deleted Item');
  const [user_id, setUserId] = useState();
  const nav = useNavigate()
  useEffect(() => {
    setUserId(localStorage.getItem('id_user'));
    axios.get('/api')
      .then(response => {
        setApiStore(response.data);
        setLoader(true);
      })
      .catch(err => console.log(err))
  }, []);

  const deleteStore = (id) => {
    axios.delete(`/api/delete-store/${id}`).
      then(response => {
        console.log(response.data);

      }
      )
      .catch(err => console.log(err));
  }

  return (
    <div className='pb-10'>

      {display &&
        <div className='bg-red-600 py-2 text-center rounded-lg shadow-xl w-5/12 md:w-3/12 xl:w-2/12 absolute top-[7.5rem] -translate-x-[50%] left-[50%]'>
          <p className='text-gray-100 font-bold  text-2xl'>{deleteItem}</p>
        </div>}

      {
        loader ? <div className='bg-white w-10/12 xl:w-7/12 md:grid-cols-2 lg:grid-cols-3  grid xl:grid-cols-3 gap-6 justify-items-center gap-y-5 m-auto shadow-2xl mt-24 py-5 px-2 rounded-md'>

          {
            apiStore.map(item => {
              return (
                <div key={item.id} className='bg-gray-100 px-3 py-2 rounded-md'>
                  <img src={item.logo} className='w-40 h-36 object-cover m-auto' alt="" />
                  <div className='text-lg font-bold text-center '>
                    <p>{item.storeName}</p>
                  </div>
                  <div className='btns flex  gap-2 px-2'>
                    {user_id == item.user_id ? (<button type="" onClick={() => {
                      deleteStore(item.id)
                      setDisplay(true);
                    }} className='bg-red-700 text-gray-50  px-1 rounded-sm'>Delete</button>) : ''}

                    <Link to={'prodcut/' + item.id} className={user_id == item.user_id ? 'bg-sky-700  ml-2  text-gray-50 px-1 rounded-sm' : 'bg-sky-700  py-1 m-auto px-1 text-gray-50  rounded-sm'}><span>Products</span></Link>


                  </div>

                  <div className='flex items-center ml-9 m-auto py-2'>
                    {user_id == item.user_id ? <Link to={`additem/${item.id}`} className='bg-yellow-600 ml-2 text-gray-50 px-1 rounded-sm'>add item</Link> : ''}
                  </div>

                </div>
              )
            }
            )
          }
        </div> : <div className="spinner absolute top-[50%] left-[47%]  "></div>
      }

    </div>
  )
}

export default Home
