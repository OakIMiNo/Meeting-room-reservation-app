import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import Container from "@mui/material/Container";

const Room: React.FC = (props) => {
  const [room, setRoom] = useState([])
  const { roomId } = useParams();

  useEffect(() =>
  {
    
    axios
      .get(`http://localhost:8080/rooms/${roomId}`)
      .then((res) => setRoom(res.data));
  }, [])
  
  console.log(roomId);
  console.log(room);

    
  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <Box
          sx={{
            width: 300,
            height: 300,
            backgroundColor: "primary.dark",
            "&:hover": {
              backgroundColor: "primary.main",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <img src={room.img_url} />
        </Box>
      </Container>
    </>
  );
}



export default Room;