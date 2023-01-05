import React from "react";
import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Box } from "@mui/material";

export function InputTime() {
  const [startTime, setStartTime] = React.useState<Dayjs | null>(null);
  const [endTime, setEndTime] = React.useState<Dayjs | null>(null);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ m: 2, width: "25ch" }}>
          <TimePicker
            label="開始時間"
            value={startTime}
            onChange={(newStartTime) => {
              setStartTime(newStartTime);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
        <Box sx={{ m: 2, width: "25ch" }}>
          <TimePicker
            label="終了時間"
            value={endTime}
            onChange={(newEndTime) => {
              setEndTime(newEndTime);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
      </LocalizationProvider>
    </>
  );
}
