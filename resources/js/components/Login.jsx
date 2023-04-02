import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'



function Login() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [Msg, setMsg] = useState()
  const [msgError, setMsgError] = useState([])
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();


  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post('/api/login',
          {
            email,
            password
          }).
          then(response => {
            setMsg(response.data.msg);


            if (response.data.status === 200) {
              localStorage.setItem('id_user', response.data.id_user)
              navigate('/')
            } else if (response.data.status === 401) {
              setEmail('')
              setPassword('')
              setMsg(response.data.msg)
            } else {
              setMsgError(response.data.response_error)
              console.log(msgError)
            }
          })
          .catch(err => console.log(err));


      });

    } catch (err) {
      if (err.response.status === 422) {
        setErrors(err.response.data.errors)
        console.log(msgError)
      }
    }

  }
  return (
    <div className=''>
      <form className='flex flex-col gap-y-1 bg-white shadow-2xl rounded-md w-11/12 md:w-7/12 lg:w-5/12 xl:w-4/12 m-auto py-8 mt-32'>
        <div>
          <h1 className='font-bold text-4xl pb-3 ml-7'>Login</h1>
        </div>
        <div>
          <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='w-10/12 ml-8 rounded-md' name="email" />
        </div>
        <div>
          {
            errors.email && <div>
              <span className='text-red-700'>{errors.email[0]}</span>
            </div>
          }
        </div>

        <div>
          <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} className='w-10/12 ml-8 rounded-md' name="password" />
        </div>
        <div>
          <p className='text-red-700 font-bold ml-9 '>{Msg}</p>

        </div>

        <div className='flex justify-end mr-9 md:mr-12 lg:mr-10 xl:mr-14'>
          <Link to={'/signup'} className='hover:underline'><span>Create Account?</span></Link>
        </div>

        <div className='flex justify-end mr-9 md:mr-12 lg:mr-10 xl:mr-14 '>
          <input type="submit" onClick={handelSubmit} className='bg-slate-950 text-lg hover:bg-slate-800 duration-200 cursor-pointer text-gray-100 rounded-md tracking-wider py-1 px-2' value="Login" />
        </div>
      </form>
    </div>
  )
}

export default Login
