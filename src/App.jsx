import React from 'react'
import List from './components/list/List'
import Chat from './components/chat/Chat'
import Details from './components/details/Details'
import Login from './components/login/Login'
import Notifications from './components/Notifications'

const App = () => {

  const user = false

  return (
    <>
      <div className="container w-[90vw] h-[90vh] bg-[rgba(15,15,15,0.71)] backdrop-blur-sm rounded-xl flex">
        {user ? (<>
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