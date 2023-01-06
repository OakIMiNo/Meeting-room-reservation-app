import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import MyPage from "./pages/Mypage";
import Header from "./components/Header";
import Home from "./pages/Home";
import { AuthProvider } from "./context/auth";

// Haruko test
import { GetReservations } from "./components/GetReservations";
import { PostReservation } from "./components/PostReservation";
import Cancel from "./pages/Cancel";
import Reservation from "./pages/Reservation";

const App = (): JSX.Element => {
  return (
    <>
      {/* ページ作成したら追加する */}
      <AuthProvider>
        <header>
          <Header />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/reservation" element={<Reservation />} />
        </Routes>
      </AuthProvider>

      {/* Haruko test
      <br />
      <h1>予約API呼び出し</h1>
      <PostReservation />
      <br />
      <GetReservations />
      <br /> */}
    </>
  );
};

export default App;
