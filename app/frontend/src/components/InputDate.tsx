import React from "react";
import { Box, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export function InputDate() {
  const [date, setDate] = React.useState<Date | null>(null);

  const handleChange = (newDate: Date | null) => {
    setDate(newDate);
  };

  // 本日の日付を作成
  const referenceDate = new Date();

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
            // 前日までが選択不可になる
            minDate={referenceDate}
          />
        </Box>
      </LocalizationProvider>
      <br />
    </>
  );
}
