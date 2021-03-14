import React, {useState, useEffect} from 'react'
import queryString from 'querystring'
import io from 'socket.io-client'

const Chat = ({location}) =>{
    useEffect(()=>{
        location.search = location.search[0] === '?' ? location.search.substr(1,location.search.length) : location.search;
        const {name, room} = queryString.parse(location.search)
        console.log(name, room)
    })

    return (
        <h1>Chat</h1>
    )
}

export default Chat