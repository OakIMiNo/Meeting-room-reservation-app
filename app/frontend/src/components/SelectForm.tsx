import React from "react";
import { FormControl, InputLabel, Select } from "@mui/material";

const SelectForm: React.FC = () => {
  return (
    <>
      <FormControl>
        <InputLabel>RoomType</InputLabel>
        <Select
          name="roomType"
          value="room1"
          // value={editedTask.category}
          // onChange={handleSelectCatChange}
        >
          {/* {catOptions} */}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectForm;
