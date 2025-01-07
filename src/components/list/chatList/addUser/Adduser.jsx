import React from 'react'

const Adduser = () => {
  return (
    <div className='addUser flex flex-col gap-3 w-fit h-fit p-7 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#152427ad] rounded-md shadow-[0_0_20px] shadow-[#ffffff44]'>
        <h2>Add User</h2>
        <form action="" className='flex gap-3 text-sm items-center mb-3'>
            <input type="text" placeholder='Username' name='username' className='p-2 bg-white text-black border-none outline-none rounded-md'/>
            <button className='bg-blue-600 rounded-md p-2'>Search</button>
        </form>
        <div className="user flex justify-between items-center text-sm">
            <div className="details flex gap-3 items-center">
                <img src="/Images/profile.jpg" alt="" className='w-8 h-8 rounded-full' />
                <span>Shamoon</span>
            </div>
            <button className='bg-blue-600 rounded-md px-2 py-1 text-xs'>Add user</button>
        </div>
    </div>
  )
}

export default Adduser