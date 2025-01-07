import React, { useState } from 'react'

const Chatlist = () => {
    const [addMode, setAddMode] = useState(false)
  return (
    <div className='chatList overflow-auto flex flex-col'>
        <div className="search flex w-full justify-around items-center my-3">
            <div className="serachBar flex bg-[#1b2f33ad] p-[6px] pl-2 rounded-md items-center gap-2 w-[80%]">
                <img src="/Images/search.png" alt="" className='w-4 h-4' />
                <input type="text" placeholder='Search' className='bg-transparent text-xs border-none outline-none ' />
            </div>
            <img src={addMode ? "/Images/minus.png" : "/Images/add.png"} alt="" className='w-7 h-7 bg-[#1b2f33ad] rounded-md cursor-pointer p-1' onClick={() => setAddMode(!addMode)} />
        </div>


        <div className="item flex items-center cursor-pointer gap-3 p-3 border-b border-[#546d724f] ">
            <img src="/Images/profile.jpg" alt="" className='w-8 h-8 rounded-full' />
            <div className="texts text-sm">
                <span>Shamoon</span>
                <p className='text-xs'>Hello</p>
            </div>
        </div>
        <div className="item flex items-center cursor-pointer gap-3 p-3 border-b border-[#546d724f] ">
            <img src="/Images/profile.jpg" alt="" className='w-8 h-8 rounded-full' />
            <div className="texts text-sm">
                <span>Shamoon</span>
                <p className='text-xs'>Hello</p>
            </div>
        </div>
        <div className="item flex items-center cursor-pointer gap-3 p-3 border-b border-[#546d724f] ">
            <img src="/Images/profile.jpg" alt="" className='w-8 h-8 rounded-full' />
            <div className="texts text-sm">
                <span>Shamoon</span>
                <p className='text-xs'>Hello</p>
            </div>
        </div>
        <div className="item flex items-center cursor-pointer gap-3 p-3 border-b border-[#546d724f] ">
            <img src="/Images/profile.jpg" alt="" className='w-8 h-8 rounded-full' />
            <div className="texts text-sm">
                <span>Shamoon</span>
                <p className='text-xs'>Hello</p>
            </div>
        </div>
        
    </div>
  )
}

export default Chatlist