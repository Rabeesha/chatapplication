
import './App.css';
import Chat from'./components/Chat.js'
import{Button,Container,Row,Col} from'react-bootstrap'
import io from'socket.io-client'
import{useState}from 'react'
const socket=io.connect("http://localhost:5000");
function App() {
  const[username,setUsername]=useState("");
  const[room,setRoom]=useState("");
  const[showChat,setShowChat]=useState(false)
  const joinRoom=()=>{
if(username!==""&&room!==""){
  socket.emit("join_room",room);
  console.log(room)
  setShowChat(true)
}
  }
  return (
   
    <div className="App">
    <>
     {!showChat?(
         <div>
      <h3 className="join">Jion a chat</h3>
      <div>
      <input type="text" placeholder="name.." className="text1 mb-4"onChange={(event)=>{
        setUsername(event.target.value);
        console.log(event.target.value)
      }}/>
      </div>
     <div><input type="text" className="text2" placeholder="room id.."onChange={(event)=>{
        setRoom(event.target.value);
        console.log(event.target.value)

      }}/></div>
      
       <Button variant="success" className="joinbtn"  onClick={joinRoom}>Jion</Button>
       </div>
  )
  :(
      <Chat socket={socket} username={username} room={room}/>
     
  )}
  </>
     
    
    </div>
   
  );
}

export default App;
