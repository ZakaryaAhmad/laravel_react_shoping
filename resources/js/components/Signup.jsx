import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const handelsubmit = (e) => {
    e.preventDefault();

    if (password.length < 5) {
      setError('password must be more than 5 charchter')
    }

    else {
      e.preventDefault();
      axios.post('/api/sign-up',
        {
          name,
          email,
          password
        }).then(response => {
          setError('');
          navigate('/login')
        }).catch(err => console.log(err))
    }
  }

  return (
    <div className=''>
      <form onSubmit={handelsubmit} className='flex flex-col gap-y-2 bg-white shadow-2xl rounded-md w-11/12 md:w-10/12 xl:w-4/12 lg:w-6/12 m-auto py-8 mt-32'>
        <div>
          <h1 className='font-bold text-4xl  ml-7'>Sign Up</h1>
        </div>

        <div>
          <input type="text"
            onChange={(e) => setName(e.target.value)}

            placeholder='UserName'
            className='w-10/12  ml-8 rounded-md'
            name="name"

          />
        </div>

        <div>
          <input
            type="email"
            placeholder='Email'
            className='w-10/12 ml-8 rounded-md'
            onChange={(e) => setEmail(e.target.value)}
            name="email"

          />
        </div>

        <div>
          <input
            type="password"
            placeholder='Password'
            className='w-10/12 ml-8 rounded-md'
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <p className='text-sm text-red-600 ml-9 mt-2'>{error}</p>
        </div>

        <div className='flex justify-end mr-7 md:mr-20 lg:mr-14 xl:mr-14 '>
          <Link to={'/login'} className='hover:underline'><span>already have account?</span></Link>
        </div>


        <div className='flex justify-end mr-7 md:mr-20 lg:mr-14  xl:mr-14 '>
          <input type="submit" className='bg-slate-950 text-lg hover:bg-slate-800 duration-200 cursor-pointer text-gray-100 rounded-md tracking-wider py-1 px-2' value="Sign Up" />
        </div>

      </form>
    </div>
  )
}

export default Signup
