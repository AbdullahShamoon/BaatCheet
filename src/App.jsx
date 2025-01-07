import React from 'react'
import List from './components/list/List'
import Chat from './components/chat/Chat'
import Details from './components/details/Details'

const App = () => {
  return (
    <>
    <div className="container w-[90vw] h-[90vh] bg-[rgba(15,15,15,0.71)] backdrop-blur-sm rounded-xl flex">
      <List />
      <Chat />
      <Details />
    </div>
    </>
  )
}

export default App