import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";

const App = (): JSX.Element => {
  return (
    <>
      {/* ページ作成したら追加する */}
      <Routes>
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
};

export default App;
