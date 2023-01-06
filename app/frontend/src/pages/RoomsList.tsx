import React, { useState, useEffect } from "react";
import { useForm, Resolver } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const RoomsList: React.FC = () => {
  const [rooms, setRooms] = useState([])
  const [areas, setAreas] = useState([]);
  const { user, isAuthenticated } = useAuth();
  

  useEffect(() =>
  {
      axios
        .get("http://localhost:8080/rooms")
        .then((res) => setRooms(res.data))
        .then((res) =>
        {
          axios.get("http://localhost:8080/areas")
          .then(res => setAreas(res.data))
        })
  }, [])
  
    
  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#ffff" }}>
          <ImageList sx={{ width: 500, height: 450 }}>
            {rooms.map((room: any, index: number) => (
              <ImageListItem key={room.id}>
                <Link to={`/rooms/${room.id}`} key={room.id}>
                  <img
                    src={`${room.img_url}?w=248&fit=crop&auto=format`}
                    srcSet={`${room.img_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={room.name}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={room.title}
                    subtitle={
                      <span>
                        {room.name} 住所: {room.address} 上限人数:{" "}
                        {room.capacity}
                      </span>
                    }
                    position="below"
                  />
                </Link>
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Container>
    </>
  );
}

export default RoomsList;
