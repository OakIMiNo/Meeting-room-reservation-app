import React, { useState } from "react";
import { isNotEmittedStatement } from "typescript";
import { Box, TextField, Button } from "@mui/material";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import axios from "axios";
import qs from "qs";
import { GetReservations } from "./GetReservations";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

export const PostReservation = () => {
  const ENDPOINT = "http://localhost:8080/reservation/";

  const [date, setDate] = React.useState<Date | null>(null);
  const [startTime, setStartTime] = React.useState<Dayjs | null>(null);
  const [endTime, setEndTime] = React.useState<Dayjs | null>(null);

  const [roomId, setRoomId] = useState("");
  const [userId, setUserId] = useState("");
  const [sqlDate, setSqlDate] = useState("");
  const [sqlStartTime, setSqlStartTime] = useState("");
  const [sqlEndTime, setSqlEndTime] = useState("");
  const [addMessage, setAddMessage] = useState("");

  // 日付が入力されたらAPI用に型変更後、表示用にsetDate
  const dateChange = (newDate: Date | null) => {
    if (newDate !== null) {
      const strDate = newDate.toLocaleString(); //2023/1/6 0:00:00
      const dateArr = [
        strDate.split("/")[0],
        strDate.split("/")[1],
        strDate.split("/")[2].split(" ")[0],
      ];
      if (dateArr[1].length === 1) {
        dateArr[1] = `0${dateArr[1]}`;
      }
      if (dateArr[2].length === 1) {
        dateArr[2] = `0${dateArr[2]}`;
      }
      setSqlDate(`${dateArr[0]}-${dateArr[1]}-${dateArr[2]}`); // 2023-01-06
    }
    setDate(newDate); // Fri Jan 06 2023 00:00:00 GMT+0900 (GMT+09:00)
  };

  // 時間が入力されたらAPI用に型変更後、表示用にsetDate
  const startTimeChange = (time: Dayjs | null) => {
    if (time !== null) {
      const strTime = time.format().split("T")[1].substr(0, 5);
      setSqlStartTime(strTime); // 01:05:00
    }
    setStartTime(time); // M {$L: 'en', $u: undefined, $d: Fri Jan 06 2023 09:00:00 GMT+0900 (GMT+09:00), $x: {…}, $y: 2023, …}
  };

  const endTimeChange = (time: Dayjs | null) => {
    if (time !== null) {
      const strTime = time.format().split("T")[1].substr(0, 5);
      setSqlEndTime(strTime); // 01:05
    }
    setEndTime(time); // M {$L: 'en', $u: undefined, $d: Fri Jan 06 2023 09:00:00 GMT+0900 (GMT+09:00), $x: {…}, $y: 2023, …}
  };

  // 追加ボタンをクリックで、API呼び出し関数に値を渡す
  const onClickAdd = () => {
    if (!roomId) {
      setAddMessage("会議室IDを入力してください");
      return;
    } else if (!date) {
      setAddMessage("利用日を選択してください");
      return;
    } else if (!startTime) {
      setAddMessage("入室時間を選択してください");
      return;
    } else if (!endTime) {
      setAddMessage("退室時間を選択してください");
      return;
    } else {
      postReservation(roomId, userId, sqlDate, sqlStartTime, sqlEndTime);
    }
  };

  // POST API呼び出し
  const postReservation = async (
    roomId: string,
    userId: string,
    date: string,
    startTime: string,
    endTime: string
  ) => {
    const postParam = qs.stringify({
      room_id: roomId,
      user_id: userId,
      date: date,
      start_time: startTime,
      end_time: endTime,
    });

    axios
      .post(ENDPOINT, postParam)
      .then((res) => {
        console.log(JSON.stringify(res.data));
        if (res.status === 200) {
          setAddMessage("予約が完了しました");
          setDate(new Date());
          setStartTime(null);
          setEndTime(null);
          setRoomId("");
        }
      })
      .catch((error) => {
        setAddMessage(
          error.response.status + ": 予期しないエラーが発生しました"
        );
      });
  };

  return (
    <>
      <TextField
        sx={{ m: 2, width: "25ch" }}
        required
        id="outlined-required"
        label="ユーザーID"
        variant="outlined"
        value={userId}
        onChange={(event) => setUserId(event.target.value)}
      />
      <br />

      <TextField
        sx={{ m: 2, width: "25ch" }}
        required
        id="outlined-required"
        label="会議室ID"
        variant="outlined"
        value={roomId}
        onChange={(event) => setRoomId(event.target.value)}
      />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ m: 2, width: "25ch" }}>
          <DatePicker
            label="利用日"
            value={date}
            onChange={dateChange}
            inputFormat="yyyy/MM/dd"
            mask="____/__/__"
            renderInput={(params) => <TextField {...params} />}
            minDate={new Date()} // 本日以降のみ選択可
          />
        </Box>
      </LocalizationProvider>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 2, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      ></Box>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ m: 2, width: "25ch" }}>
          <TimePicker
            label="開始時間"
            value={startTime}
            onChange={startTimeChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>

        <Box sx={{ m: 2, width: "25ch" }}>
          <TimePicker
            label="終了時間"
            value={endTime}
            onChange={endTimeChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
      </LocalizationProvider>

      <Button
        sx={{ m: 2, width: "25ch" }}
        variant="contained"
        color="secondary"
        size="large"
        onClick={onClickAdd}
      >
        予約登録
      </Button>

      <h3>{addMessage}</h3>
      <br />
      <GetReservations />
      <br />

      <p>開始・終了時間の差分から利用時間を出したい</p>
      <p>ヘッダーなどを追加してpages/AddReservation.tsxでページを作成したい</p>
      <br />
    </>
  );
};
