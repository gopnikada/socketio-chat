const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const cors = require('cors')

const app = express()
const server = http.createServer(app)
const io = socketio(server, {
    cors: {
        origin: "your origin",
        methods: ["GET", "POST"],
        credentials: true
    }
})

const PORT = process.env.PORT || 5000
const router = require('./router')

io.on('connection', socket =>{
    console.log('got new connection')
    socket.on('disconnect',()=>{
        console.log('user left')
    })
})

app.use(cors());
app.use(router)


server.listen(PORT, ()=>console.log(`server started at ${PORT}`))