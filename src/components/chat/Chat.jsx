import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'

const Chat = () => {

  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji)
    setOpen(false)
  }

  return (
    <div className='w-[50%] h-full border-x border-[#546d724f] flex flex-col'>

      <div className="top flex justify-between items-center p-3 border-b border-[#546d724f]">
        <div className="user flex items-center gap-3">
          <img src="/Images/profile.jpg" alt="" className='w-9 h-9 rounded-full' />
          <div className="texts">
            <span className='font-semibold'>Shamoon Mallick</span>
            <p className='text-xs text-gray-400'>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="icons flex items-center justify-center gap-3">
          <img src="/Images/call.png" alt="" className='w-4 h-4 cursor-pointer' />
          <img src="/Images/video.png" alt="" className='w-4 h-4 invert cursor-pointer' />
          <img src="/Images/info.png" alt="" className='w-4 h-4 cursor-pointer' />
        </div>
      </div>

      <div className="center p-3 flex-1"></div>

      <div className="bottom flex gap-3 justify-between items-center p-3 border-t border-[#546d724f]">
        <div className="icons flex items-center justify-center gap-3">
          <img src="/Images/image.png" alt="" className='w-4 h-4 cursor-pointer' />
          <img src="/Images/camera.png" alt="" className='w-4 h-4 cursor-pointer' />
          <img src="/Images/mic.png" alt="" className='w-4 h-4 cursor-pointer' />
        </div>
        <input type="text" placeholder='Type a message' className='bg-[#1b2f33ad] rounded-md p-3 text-xs border-none outline-none flex-1' onChange={(e) => setText(e.target.value)} value={text} />
        <div className="emoji relative">
          <img src="/Images/emoji.png" alt="" className='w-6 h-6 cursor-pointer' onClick={() => setOpen((prev) => !prev)} />
          <div className="picker absolute bottom-10 left-0">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className='bg-[#3b83f6c9] text-white rounded-md px-3 py-2 text-xs cursor-pointer'>Send</button>
      </div>
    </div>
  )
}

export default Chat