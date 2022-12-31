import React from "react";
import "./App.css";
import ButtonIcon from "./ButtonIcon";
import Login from "./Login";
import ReservedDetails from "./ReservedDetails";
import SelectForm from "./SelectForm";

function App() {
  return (
    <>
      <h1>Booking meeting rooms</h1>
      <p>ログインコンポーネント</p>
      <Login />
      <br />
      <p>予約詳細コンポーネント</p>
      <ReservedDetails />
      <br />
      <p>ボタンコンポーネント</p>
      <ButtonIcon />
      <br />
      <p>選択フォーム</p>
      <SelectForm />
    </>
  );
}

export default App;
