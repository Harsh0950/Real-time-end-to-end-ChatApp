const express=require('express')
const app=express();
const http=require('http').createServer(app)
const port=3000;

app.use(express.static("public"))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

//socket
const io=require('socket.io')(http)//socket ko pta chalega konse server par kaam karna hai

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        console.log(msg)
        socket.broadcast.emit('message', msg)//client ko bheja hai message
    })
})


http.listen(port,()=>{
    console.log(`server is listening at ${port}`)
})