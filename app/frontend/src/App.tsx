import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/Mypage";
import Header from "./components/Header"
import Home from "./pages/Home";
import { AuthProvider } from "./context/auth"


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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
