import React from 'react'

const Userinfo = () => {
  return (
    <div className='userInfo flex flex-row justify-between p-3'>
        <div className="user flex items-center justify-center gap-3">
            <img src="/Images/profile.jpg" className='rounded-full w-8 h-8' alt="" />
            <h2 className='font-semibold'>Abdullah Shamoon</h2>
        </div>
        <div className="icons flex items-center justify-center gap-3">
            <img src="/Images/more.png" className='invert w-4 h-4 cursor-pointer' alt="" />
            <img src="/Images/video.png" className='invert w-4 h-4 cursor-pointer' alt="" />
            <img src="/Images/edit.png" className='w-4 h-4 cursor-pointer' alt="" />
        </div>
    </div>
  )
}

export default Userinfo