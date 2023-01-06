import React from "react";
import { useAuth } from "./../context/auth";
import { DeleteReservation } from "../components/DeleteReservation";
import { GetReservations } from "../components/GetReservations";

const Cancel: React.FC = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <>
      <div className="App">
        <h1>予約のキャンセル</h1>
        {/* <h1>{user.username}</h1> */}
        <DeleteReservation />
      </div>
      <br />
      <GetReservations />
      <br />
    </>
  );
};

export default Cancel;
