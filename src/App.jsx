import React, { useEffect } from 'react'
import List from './components/list/List'
import Chat from './components/chat/Chat'
import Details from './components/details/Details'
import Login from './components/login/Login'
import Notifications from './components/Notifications'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import { useUserStore } from './lib/userStore'

const App = () => {

  const {currentUser , isLoading , fetchUserInfo} = useUserStore()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid)
    })

    return () => unSub()
  }, [fetchUserInfo])

  console.log(currentUser)

  if(isLoading) return <div className='w-[90vw] h-[90vh] bg-[rgba(15,15,15,0.71)] backdrop-blur-sm rounded-xl flex justify-center items-center text-3xl'>Loading...</div>

  return (
    <>
      <div className="container w-[90vw] h-[90vh] bg-[rgba(15,15,15,0.71)] backdrop-blur-sm rounded-xl flex">
        {currentUser ? (<>
          <List />
          <Chat />
          <Details />
        </>) : <Login />}
        <Notifications />
      </div>
    </>
  )
}

export default App