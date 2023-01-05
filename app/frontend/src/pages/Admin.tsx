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
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// // import CommentIcon from '@mui/icons-material/Comment';
// import Stack from "@mui/material/Stack";

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
      {/* <Button onClick={}>新規作成</Button> */}
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">会議室一覧</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          //   value={value}
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
    </>
  );
}

export default Admin;

    //   {
    //     rooms && (
    //       <List
    //         sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    //       >
    //         {rooms.map((value: any, index: any) => {
    //           const labelId = `checkbox-list-label-${value.name}`;
    //           return (
    //             <>
    //               <ListItem
    //                 key={value.id}
    //                 // secondaryAction={
    //                 //   <IconButton edge="end" aria-label="編集">
    //                 //     <CommentIcon/>
    //                 //   </IconButton>
    //                 // }
    //                 disablePadding
    //               >
    //                 <ListItemButton
    //                   role={undefined}
    //                   onClick={handleToggle(value.id)}
    //                   dense
    //                 >
    //                   <ListItemIcon>
    //                     <Checkbox
    //                       edge="start"
    //                       // checked={checked.indexOf(value.id) !== -1}
    //                       checked={value.id}
    //                       tabIndex={-1}
    //                       disableRipple
    //                       inputProps={{ "aria-labelledby": labelId }}
    //                     />
    //                   </ListItemIcon>
    //                   <ListItemText
    //                     id={labelId}
    //                     primary={`${index + 1} ${value.name} `}
    //                   />
    //                 </ListItemButton>
    //               </ListItem>
    //             </>
    //           );
    //         })}
    //       </List>
    //     );
    //   }
    //   <Button onClick={deleteRoom}>削除</Button>;
    //   {
    //     /* <Button onClick={createRoom}>新規</Button> */
    //   }

//       const [checked, setChecked] = useState();

//   const handleToggle = (value: any) => () => {
//     //   const currentIndex = checked.indexOf(value);
// //   const currentIndex = checked;
//   const newChecked = value;
//   console.log(value);
  
//     // if (currentIndex === -1) {
//     //   newChecked.push(value);
//     // } else {
//     //   newChecked.splice(currentIndex, 1);
//     // }
//     setChecked(newChecked);
//     console.log(newChecked);