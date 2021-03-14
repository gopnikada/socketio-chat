const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const PORT = process.env.PORT || 5000
const router = require('./router')
const {addUser, removeUser, usersInRoom, getUser} = require('./users')

io.on('connection', socket =>{
    socket.on('join', ({name, room}, callback)=>{
        const {error, user} = addUser({id: socket.id, room, name})
        if(error) return callback(error)

        socket.emit('message',{user: 'admin', text: `${user.name}, wellcome to room ${user.room}`})
        socket.broadcast.to(user.room).emit('message', {user:'admin', text:`${user.name} has joined`})

        socket.join(user.room)
        callback()
    })
    socket.on('sendMessage',(message, callback)=>{
        const user = getUser(socket.id)
        io.to(user.room).emit('message', {user: user.name, text:message})
        callback()

    })

    socket.on('disconnect',()=>{
        console.log('user left')
    })

})


app.use(router)

server.listen(PORT, ()=>console.log(`server started at ${PORT}`))