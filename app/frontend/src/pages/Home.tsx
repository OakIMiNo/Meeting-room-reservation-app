import React, { useState, useEffect } from "react";
import { useForm, Resolver } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
// import style from "./../ styles / SignIn.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Header from "./../components/Header";

const Home: React.FC = () => {
  const [rooms ,setRooms ] = useState([])

  useEffect(() =>
  {
    axios.get("http://localhost:8080/rooms")
    .then(res => setRooms(res.data))
  }, [])
  
  console.log(rooms)
    
  return (
    <>
      <Header />
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Grid
          container
          spacing={2}
          sx={{
            "--Grid-borderWidth": "1px",
            borderTop: "var(--Grid-borderWidth) solid",
            borderLeft: "var(--Grid-borderWidth) solid",
            borderColor: "divider",
            "& > div": {
              borderRight: "var(--Grid-borderWidth) solid",
              borderBottom: "var(--Grid-borderWidth) solid",
              borderColor: "divider",
            },
          }}
        >
          {rooms.map((room: any, index: number) => (
            <Grid
              key={index}
              {...{ xs: 12, sm: 6, md: 4, lg: 3 }}
              minHeight={80}
            >
              <img
                // {...{ xs: 12, sm: 6, md: 4, lg: 3 }}
                src={room.img_url}
              ></img>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}



export default Home;
