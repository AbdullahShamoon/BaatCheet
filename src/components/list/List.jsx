import React from 'react'
import Userinfo from './userInfo/Userinfo'
import Chatlist from './chatList/Chatlist'

const List = () => {
  return (
    <div className='w-[25%] flex flex-col'>
        <Userinfo />
        <Chatlist />
    </div>
  )
}

export default List