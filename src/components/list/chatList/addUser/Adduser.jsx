import React, { useState } from 'react'
import { collection, query, where, getDocs, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from '../../../../lib/firebase';
import { updateDoc, arrayUnion } from 'firebase/firestore';
import { useUserStore } from '../../../../lib/userStore';

const Adduser = () => {
  const [user, setUser] = useState(null)
  const { currentUser } = useUserStore()

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const q = query(collection(db, "users"), where("username", "==", e.target.username.value));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data());
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleAdd = async () => {
    const chatRef = collection(db, "chats")
    const userChatRef = collection(db, "userChats")

    try {
      const newChatRef = doc(chatRef)
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: []
      })

      await updateDoc(doc(userChatRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now()  // serverTimestamp() may not work with arrayUnion , if not , use Date.now()
        })
      })

      await updateDoc(doc(userChatRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now()  // serverTimestamp() may not work with arrayUnion , if not , use Date.now()
        })
      })

    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='addUser flex flex-col gap-3 w-fit h-fit p-7 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#152427ad] rounded-md shadow-[0_0_20px] shadow-[#ffffff44]'>
      <h2>Add User</h2>
      <form action="" className='flex gap-3 text-sm items-center mb-3' onSubmit={handleSearch}>
        <input type="text" placeholder='Username' name='username' className='p-2 bg-white text-black border-none outline-none rounded-md' />
        <button className='bg-blue-600 rounded-md p-2'>Search</button>
      </form>
      {user && (
        <div className="user flex justify-between items-center text-sm">
          <div className="details flex gap-3 items-center">
            <img src={user.avatar || "/Images/profile.jpg"} alt="" className='w-8 h-8 rounded-full object-cover' />
            <span>{user.username}</span>
          </div>
          <button className='bg-blue-600 rounded-md px-2 py-1 text-xs' onClick={handleAdd}>Add user</button>
        </div>
      )}
    </div>
  )
}

export default Adduser