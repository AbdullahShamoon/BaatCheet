import React from 'react'
import { useUserStore } from '../../../lib/userStore'

const Userinfo = () => {
  const { currentUser } = useUserStore()

  return (
    <div className='userInfo flex flex-row justify-between p-3'>
      <div className="user flex items-center justify-center gap-3">
        <img src={currentUser.avatar || "/Images/profile.jpg"} className='rounded-full w-8 h-8 object-cover' alt="" />
        <h2 className='font-semibold'>{currentUser.username}</h2>
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