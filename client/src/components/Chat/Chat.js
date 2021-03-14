import React, {useState, useEffect} from 'react'
import queryString from 'querystring'
import io from 'socket.io-client'

let socket;

const Chat = ({location}) =>{
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
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

        socket.emit('join', {name, room}, ({error})=>{
            console.log(error)
        })
        return ()=>{
            socket.emit('disconnect')

            socket.off()
        }

    }, [ENDPOINT, location.search])//todo firying log twice

    useEffect(()=>{
        socket.on('message', (message)=>{
            setMessages([...messages, message])//adding a message to messages arr
        })
    }, [messages])

    //function for sending messages
    const sendMessage = (event)=>{
        event.preventDefault()
        if(message){
            socket.emit('sendMessage', message, ()=>{setMessage('')})
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <input value={message}
                onChange={event=>setMessage(event.target.value)}
                onKeyPress={event=>event.key === 'Enter' ? sendMessage(event): null}/>
            </div>
        </div>
    )
}

export default Chat