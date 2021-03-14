import React, {useState, useEffect} from 'react'
import queryString from 'querystring'
import io from 'socket.io-client'

let socket;

const Chat = ({location}) =>{
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const ENDPOINT = 'localhost:5000'
    useEffect(()=>{
        let connectionOptions =  {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity",
            "timeout" : 10000,
            "transports" : ["websocket"]
        };
        location.search = location.search[0] === '?' ? location.search.substr(1,location.search.length) : location.search;
        const {name, room} = queryString.parse(location.search)

        socket = io.connect(ENDPOINT,connectionOptions )

        setName(name)
        setRoom(room)

        socket.emit('join', {name, room}, ({status})=>{
            console.log(status)
        })

    }, [ENDPOINT, location.search])

    return (
        <h1>Chat</h1>
    )
}

export default Chat