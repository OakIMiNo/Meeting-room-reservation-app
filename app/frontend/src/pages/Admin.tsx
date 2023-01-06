import React, { useEffect, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import axios from "axios";
import { useAuth } from "./../context/auth";
import Button from "@mui/material/Button";
import { handleBreakpoints } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Header from "./../components/Header";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";


const Admin = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [message, setMessage] = useState("");
  const [rooms, setRooms] = useState<any>([])
  const navigate = useNavigate()

  useEffect(() => {
    isAuthenticated()
      
    console.log("通過");
    axios
    .get("http://localhost:8080/rooms")
    .then((res) => setRooms(res.data))
    .catch(e => console.log(e))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    const [selectRoom, setSelectRoom] = useState()
    
    const handleChange = (event:any) =>
    {
        setSelectRoom(event.target.value);
    } 

    const deleteRoom = () =>
    {
        console.log(selectRoom);
        const room_id = selectRoom;
        const body = { disabled: "true" };
        axios
          .put(`http://localhost:8080/rooms/${room_id}`, body)
            .then((res) => setMessage("削除しました"))
            .then(res => navigate("/admin"))
          .catch((e) => console.log(e))
    }

  return (
    <>
      <Header />
      <Box sx={{
        flexDirection: "column-reverse",
        mx: 'auto',
        p: 2
      }}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            管理者権限:会議室削除機能
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            onChange={handleChange}
          >
            {rooms.map((value: any, index: any) => {
              return (
                <FormControlLabel
                  key={value.id}
                  value={value.id}
                  control={<Radio />}
                  label={value.name}
                />
              );
            })}
          </RadioGroup>
          <Button onClick={deleteRoom}>削除</Button>
        </FormControl>
        {message}
      </Box>
    </>
  );
}

export default Admin;