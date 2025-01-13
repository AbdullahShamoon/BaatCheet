import React, { useEffect, useState } from 'react'
import Adduser from './addUser/Adduser'
import { db } from '../../../lib/firebase'
import { useUserStore } from '../../../lib/userStore'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { useChatStore } from '../../../lib/chatStore'

const Chatlist = () => {
    const [addMode, setAddMode] = useState(false)
    const [chats, setChats] = useState([])

    const { currentUser } = useUserStore()
    const { changeChat } = useChatStore()

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "userChats", currentUser.id), async (res) => {
            const items = res.data().chats

            // Get user data for each chat 
            const promises = items.map(async (item) => {
                const docRef = doc(db, "users", item.receiverId);
                const docSnap = await getDoc(docRef);

                const user = docSnap.data();
                return { ...item, user }
            });

            const chatData = await Promise.all(promises);

            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));


        });

        return () => {
            unsub()
        }
    }, [currentUser.id])

    const handleSelect = async (chat) => {
        const userChats = chats.map((item) => {
            const { user, ...rest } = item
            return rest
        })
        const chatIndex = userChats.findIndex((item) => item.chatId === chat.chatId)
        userChats[chatIndex].isSeen = true

        const userChatsRef = doc(db, "userChats", currentUser.id)
        try {
            await updateDoc(userChatsRef, {
                chats: userChats
            })
            changeChat(chat.chatId, chat.user)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className='chatList overflow-auto flex flex-col'>
            <div className="search flex w-full justify-around items-center my-3">
                <div className="serachBar flex bg-[#1b2f33ad] p-[6px] pl-2 rounded-md items-center gap-2 w-[80%]">
                    <img src="/Images/search.png" alt="" className='w-4 h-4' />
                    <input type="text" placeholder='Search' className='bg-transparent text-xs border-none outline-none ' />
                </div>
                <img src={addMode ? "/Images/minus.png" : "/Images/add.png"} alt="" className='w-7 h-7 bg-[#1b2f33ad] rounded-md cursor-pointer p-1' onClick={() => setAddMode(!addMode)} />
            </div>

            {chats.map((chat) => (
                <div className="item flex items-center cursor-pointer gap-3 p-3 border-b border-[#546d724f]" key={chat.chatId} onClick={() => handleSelect(chat)} style={{ backgroundColor: chat?.isSeen ? "" : "#5183fe" }}>
                    <img src={chat.user.avatar || "/Images/profile.jpg"} alt="" className='w-8 h-8 rounded-full object-cover' />
                    <div className="texts text-sm">
                        <span>{chat.user.username}</span>
                        <p className='text-xs'>{chat.lastMessage}</p>
                    </div>
                </div>
            ))}


            {addMode && <Adduser />}
        </div>
    )
}

export default Chatlist