import React from "react";
import { Box, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export function InputDate() {
  const [date, setDate] = React.useState<Date | null>(null);

  const handleChange = (newDate: Date | null) => {
    setDate(newDate);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ m: 2, width: "25ch" }}>
          <DatePicker
            label="利用日"
            value={date}
            onChange={handleChange}
            inputFormat="yyyy/MM/dd"
            mask="____/__/__"
            renderInput={(params) => <TextField {...params} />}
            minDate={new Date()} // 本日以降のみ選択可
          />
        </Box>
      </LocalizationProvider>
      <br />
    </>
  );
}
