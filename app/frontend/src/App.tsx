import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/Mypage";
import Admin from "./pages/Admin";
import RoomsList from "./pages/RoomsList";
import { AuthProvider } from "./context/auth"
import Room from "./pages/Room";


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
          <Route path="/rooms" element={<RoomsList />} />
          <Route path="/rooms" element={<Room />}>
            <Route path="/rooms/:roomId" element={<Room />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
