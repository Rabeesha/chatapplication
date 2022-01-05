const express =require("express") ;
const app=express();
const http =require("http")

const cors =require ("cors");
const {Server} =require("socket.io");

app.use(cors());
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    },

});


io.on("connection",(socket)=>{
    console.log(`user connected:${socket.id}`);
    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`user with id:${socket.id}joined room:${data}`);
    });
    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data);
         console.log(data)
    })
    socket.on("disconnect",()=>{
        console.log("user Disconnected",socket.id);
    });
});
server.listen(5000,()=>{
    console.log("server running");
})

// // test API
// app.get('/',(req,res)=>{
//     res.send("api is running")
// })



