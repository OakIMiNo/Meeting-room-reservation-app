import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import MyPage from "./pages/Mypage";
import Header from "./components/Header";
import Home from "./pages/Home";
import { AuthProvider } from "./context/auth";

// Haruko test
import ButtonIcon from "./ButtonIcon";
import Login from "./Login";
import ReservedDetails from "./ReservedDetails";
import SelectForm from "./SelectForm";
import { GetReservations } from "./components/GetReservations";
import { InputDate } from "./components/InputDate";
import { InputTime } from "./components/InputTime";

const App = (): JSX.Element => {
  return (
    <>
      {/* ページ作成したら追加する */}
      <AuthProvider>
        <header>
          <Header />
        </header>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </AuthProvider>

      {/* Haruko test */}
      <br />
      <h1>予約一覧＿作業中</h1>
      <GetReservations />
      <br />
      <InputDate />
      <InputTime />
      <br />
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
};

export default App;
