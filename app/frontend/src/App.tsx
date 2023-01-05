import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/Mypage";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import { AuthProvider } from "./context/auth"


const App = (): JSX.Element => {
  return (
    <>
      {/* ページ作成したら追加する */}
      <AuthProvider>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
