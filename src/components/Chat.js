import React from 'react'
import './chat.css';

import{useState,useEffect} from 'react'
import{Container,Row,Col,Button} from 'react-bootstrap'

function Chat({socket,username,room}) {
    const[currentMessage,setCurrentMessage]=useState("");
    const[messageList,setMessageList]=useState([]);
    const sendMessage=async()=>{
        if(currentMessage!==""){
            const messageData={
                room:room,
                author:username,
                message:currentMessage,
              
            };
            await socket.emit("send_message",messageData);
            setMessageList((list)=>[...list,messageData])

        }
    }
useEffect(() => {
    socket.on("receive_message",(messageData)=>{
     setMessageList((list)=>[...list,messageData])
    });
}, [socket]);


    return (
        <Container>
            
            <Row className="chatset">
                <Col md={4}>
                    <div className="side1">
{/* {messageList.map((messageContent)=>{
    return(
        <div>
            {messageContent.author}
            </div>
    )
})} */}
{username}


                    </div>
                </Col>
                <Col md={6}>
                    <div className="side2">
{messageList.map((messageContent)=>{
    return(
        <>
        <div>
   
  
    <p className="msgset"> {messageContent.author} : 
     {messageContent.message}
        </p>
      
    </div>
    
        
    

    
    </>

    
    );
})}
                    </div>
                    <div className="side3">

 <input type="text" className="texts" placeholder="hey..." onChange={(event)=>{
     setCurrentMessage(event.target.value)
 }}/>
                <button className="btn" onClick={sendMessage}>SEND</button>
                    </div>
                </Col>
            </Row>

        </Container>
    )
}

export default Chat
