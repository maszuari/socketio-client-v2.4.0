const io = require('socket.io-client')
const express = require('express')


const app = express()
const port = 3000

const socket = io("ws://localhost:5000")

socket.on('connect', function(){})

app.get('/', (req, res) => {
    let uuid = req.query.uuid
    let code = req.query.code
    socket.on('event', function(data){
        console.log(data)
    })
    res.send('UUID: '+ uuid+' code: '+ code)
})

app.get('/send',(req,res) => {
    let uuid = req.query.uuid
    let code = req.query.code
    socket.emit('event', function(data){
        console.info('Send---')
        data.uuid = uuid
        data.code = code
        console.log(data)
    })
    res.send('Send UUID: '+ uuid +' code: '+ code)
})

app.get('/quit',(req, res) => {
    socket.on('disconnect', function(){})
    res.send('Disconnect')
})

app.get('/', (request, response) => {
    response.send('Hello World!')
})
  
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})