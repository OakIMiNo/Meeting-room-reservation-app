import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { useParams } from "react-router-dom";
import { PostReservation } from "../components/PostReservation";


import Header from "../components/Header";
import Container from "@mui/material/Container";

const Room: React.FC = (props) =>
{
  const { user, isAuthenticated } = useAuth();
  const [room, setRoom] = useState<any>([])
  const { roomId } = useParams();

  useEffect( () =>
  {
    console.log(user)
    axios
      .get(`http://localhost:8080/rooms/${roomId}`)
      .then((res) => setRoom(res.data));
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  console.log(roomId);
  console.log(room);

    
  return (
    <>
      <Header />
      <Container maxWidth="sm">
        {/* <Box
          sx={{
            width: 300,
            height: 300,
          }}
        > */}
          <h4>{room.name}</h4>
          <h4>上限人数: {room.capacity}</h4>
          <h4>住所: {room.address}</h4>
          <h4>{room.description}</h4>
        {/* </Box> */}
      <PostReservation/>
      </Container>
    </>
  );
}



export default Room;