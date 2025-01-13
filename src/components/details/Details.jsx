import React from 'react'
import { auth, db } from '../../lib/firebase'
import { useUserStore } from '../../lib/userStore'
import { useChatStore } from '../../lib/chatStore'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'

const Details = () => {

  const {currentUser} = useUserStore()
  const {changeBlock , isReceiverBlocked , isCurrentUserBlocked , user , chatId} = useChatStore()
  const handleBlock = async () => {
    if (!user) return

    const userDocRef = doc(db, "users", currentUser.id)
    try {
      await updateDoc(userDocRef, {
        blocked : isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
      })
      changeBlock()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-[25%] h-full flex flex-col'>
      <div className="user flex flex-col items-center p-4 border-b border-[#546d724f] gap-1">
        <img src={user?.avatar || "/Images/profile.jpg"} alt="" className='w-[4.2rem] h-[4.2rem] rounded-full object-cover' />
        <h2 className='font-bold text-lg'>{user?.username}</h2>
        <p className='text-xs'>Lorem ipsum dolor sit amet.</p>
      </div>

      <div className="info flex flex-col text-sm">
        <div className="option px-3 py-2">
          <div className="title flex justify-between items-center">
            <span>Chat settings</span>
            <img src="/Images/up.png" alt="" className='w-5 h-5 bg-[#546d724f] rounded-full p-[0.4rem] cursor-pointer' />
          </div>
        </div>
        <div className="option px-3 py-2">
          <div className="title flex justify-between items-center">
            <span>Pricavy & help</span>
            <img src="/Images/up.png" alt="" className='w-5 h-5 bg-[#546d724f] rounded-full p-[0.4rem] cursor-pointer' />
          </div>
        </div>
        <div className="option px-3 py-2">
          <div className="title flex justify-between items-center">
            <span>Shared photos</span>
            <img src="/Images/down.png" alt="" className='w-5 h-5 bg-[#546d724f] rounded-full p-[0.4rem] cursor-pointer' />
          </div>
          <div className="photos flex flex-col">
            <div className="photoItem flex justify-between items-center py-2">
              <div className="photoDetail flex items-center gap-2">
                <img src="Images/profile.jpg" alt="" className='h-6 w-6 rounded-sm' />
                <span className='text-xs'>photo_2020_1.jpg</span>
              </div>
              <img src="/Images/download.png" alt="" className='w-5 h-5 bg-[#546d724f] rounded-full p-1 cursor-pointer' />
            </div>
            <div className="photoItem flex justify-between items-center py-2">
              <div className="photoDetail flex items-center gap-2">
                <img src="Images/profile.jpg" alt="" className='h-6 w-6 rounded-sm' />
                <span className='text-xs'>photo_2020_1.jpg</span>
              </div>
              <img src="/Images/download.png" alt="" className='w-5 h-5 bg-[#546d724f] rounded-full p-1 cursor-pointer' />
            </div>
            <div className="photoItem flex justify-between items-center py-2">
              <div className="photoDetail flex items-center gap-2">
                <img src="Images/profile.jpg" alt="" className='h-6 w-6 rounded-sm' />
                <span className='text-xs'>photo_2020_1.jpg</span>
              </div>
              <img src="/Images/download.png" alt="" className='w-5 h-5 bg-[#546d724f] rounded-full p-1 cursor-pointer' />
            </div>
            <div className="photoItem flex justify-between items-center py-2">
              <div className="photoDetail flex items-center gap-2">
                <img src="Images/profile.jpg" alt="" className='h-6 w-6 rounded-sm' />
                <span className='text-xs'>photo_2020_1.jpg</span>
              </div>
              <img src="/Images/download.png" alt="" className='w-5 h-5 bg-[#546d724f] rounded-full p-1 cursor-pointer' />
            </div>
            
          </div>
        </div>
        <div className="option px-3 py-2">
          <div className="title flex justify-between items-center">
            <span>Shared files</span>
            <img src="/Images/up.png" alt="" className='w-5 h-5 bg-[#546d724f] rounded-full p-[0.4rem] cursor-pointer' />
          </div>
        </div>
        <button className='px-3 py-2 bg-[#7f1d1dee] hover:bg-[#972323fd] m-2 rounded-sm text-xs' onClick={handleBlock}>
          {isCurrentUserBlocked ? "You are Blocked!" : isReceiverBlocked ? "User Blocked" : "Block User"}
        </button>
        <button className='px-3 py-2 bg-blue-700 hover:bg-blue-600 m-2 rounded-sm text-xs' onClick={() => auth.signOut()}>Logout</button>


      </div>
    </div>
  )
}

export default Details