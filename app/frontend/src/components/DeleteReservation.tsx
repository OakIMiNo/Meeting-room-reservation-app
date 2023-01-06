import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import axios from "axios";

export const DeleteReservation = () => {
  const ENDPOINT = "http://localhost:8080/reservation/";

  const [cancelId, setCancelId] = useState("");
  const [cancelMessage, setCancelMessage] = useState("");

  // 削除ボタン押下でDELETE API呼び出し
  const onClickCancel = async () => {
    axios
      .delete(ENDPOINT + cancelId)
      .then((res) => {
        if (res.status === 200 && JSON.stringify(res.data) === null) {
          setCancelMessage("予約はキャンセルされました");
          setCancelId("");
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setCancelMessage("入力した予約IDは存在しません");
        } else {
          setCancelMessage(
            error.response.status + ": 予期しないエラーが発生しました"
          );
        }
      });
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 2, width: "20ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="予約ID"
            variant="outlined"
            value={cancelId}
            onChange={(event) => setCancelId(event.target.value)}
          />
        </div>
      </Box>
      <Button
        sx={{ m: 2, width: "20ch" }}
        variant="contained"
        color="inherit"
        size="small"
        onClick={onClickCancel}
      >
        キャンセル
      </Button>
      <h3>{cancelMessage}</h3>
      <br />
      {/* <p>（指定したidの予約をgetで表示したい）</p> */}
    </>
  );
};
