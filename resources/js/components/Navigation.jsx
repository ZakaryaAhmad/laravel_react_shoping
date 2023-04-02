import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../components/img/onlineshopping.png'

function Navigation() {

    const [handelNavbar, setHandlNavbar] = useState(false);
    const handelNav=()=>{
        handelNavbar?setHandlNavbar(false):setHandlNavbar(true);
    }
    return (
        <div className='bg-slate-950 text-gray-100 py-6 px-4' >
            <nav className='flex justify-between items-center gap-6'>
                <div>
                    <Link to={'/'}><img src={logo} className='w-12 object-cover' alt="" /></Link>
                </div>
                <div className='lg:hidden' onClick={handelNav}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>

                </div>
                <div className={handelNavbar ? 'flex flex-col px-4 py-2 w-full absolute top-24 left-0 bg-slate-950  duration-500 ' : 'xl:flex  xl:items-center gap-5 duration-500 text-lg absolute -top-72  lg:top-9 right-8'}>
                    <Link to={'/'} className='pb-2 px-2' onClick={()=>setHandlNavbar(false)}><span>Home</span></Link>
                    <Link to={'/createstore'} className='pb-2 px-2' onClick={()=>setHandlNavbar(false)}><span>Create Store</span></Link>
                    <Link to={'/login'} className='pb-2 px-2' onClick={()=>setHandlNavbar(false)}><span>Login</span></Link>
                    <Link to={'/signup'} className='pb-2 px-2' onClick={()=>setHandlNavbar(false)}><span>Sign up</span></Link>
                </div>
            </nav>
        </div>
    )
}

export default Navigation
