import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Login = () => {

    const [avatar, setAvatar] = useState({
        file: null,
        url:""
    })

    const handleAvatar = (e) => {
        if(!e.target.files[0]) return
        setAvatar({
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // toast.success("Login Successfull")
    }

    return (
        <div className='login w-full h-full flex items-center justify-around text-sm'>
            <div className="signIn flex flex-col gap-3 items-center justify-center">
                <h2 className='text-2xl font-bold'>Welcome back ,</h2>
                <form action="" className='flex flex-col gap-3' onSubmit={handleSubmit}>
                    <input type="email" placeholder='Email' name='email' className='p-2 bg-[#546d724f] rounded-sm border-none outline-none' />
                    <input type="password" placeholder='Password' name='password' className='p-2 bg-[#546d724f] rounded-sm border-none outline-none' />
                    <button className='bg-blue-600 rounded-sm p-2 '>Sign In</button>
                </form>
            </div>
            <div className="seperator h-[80%] w-[1px] bg-[#546d7285]"></div>
            <div className="register flex flex-col gap-3 items-center justify-center">
                <h2 className='text-2xl font-semibold' >Create an Account</h2>
                <form action="" className='flex flex-col gap-3'>
                    <label htmlFor="file" className='flex items-center justify-between gap-2'>
                        <img src={avatar.url || "/Images/profile.jpg"} alt="" className='w-8 h-8 rounded-md object-cover cursor-pointer' />
                        <span className='cursor-pointer underline'>Upload an avatar</span>
                    </label>
                    <input type="file" name="file" id="file" className='hidden' onChange={handleAvatar} />
                    <input type="text" placeholder='Username' name='username' className='p-2 bg-[#546d724f] rounded-sm border-none outline-none' />
                    <input type="email" placeholder='Email' name='email' className='p-2 bg-[#546d724f] rounded-sm border-none outline-none' />
                    <input type="password" placeholder='Password' name='password' className='p-2 bg-[#546d724f] rounded-sm border-none outline-none' />
                    <button className='bg-blue-600 rounded-sm p-2 '>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Login