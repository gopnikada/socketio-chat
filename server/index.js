const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const PORT = process.env.PORT || 5000
const router = require('./router')

io.on('connection', socket =>{
    console.log('got new connection')

    socket.on('join', ({name, room}, callback)=>{
        console.log(`recieved name: ${name}, recieved room:${room}`)

        callback({status: 'Data was got'})
    })

    socket.on('disconnect',()=>{
        console.log('user left')
    })

})


app.use(router)

server.listen(PORT, ()=>console.log(`server started at ${PORT}`))