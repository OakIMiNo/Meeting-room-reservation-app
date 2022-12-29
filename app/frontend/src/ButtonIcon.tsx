import React from "react";
import { Button } from "@mui/material";

const ButtonIcon = () => {
  return (
    <>
      <Button variant="contained" color="primary" size="small">
        ログイン
      </Button>
      <br />
      <Button variant="contained" color="inherit" size="small">
        キャンセル
      </Button>
      <br />
      <Button variant="contained" color="secondary" size="small">
        新規予約
      </Button>
      <br />
      <Button variant="contained" color="success" size="small">
        ユーザー登録
      </Button>
    </>
  );
};

export default ButtonIcon;
