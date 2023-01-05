import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";

type Reservation = {
  id: number;
  user_id: number;
  room_id: number;
  user_name: string;
  room_name: string;
  start_dateTime: string;
  end_dateTime: string;
  date: Date;
  // time: Time;
  // dateTime: datetime;
};

export const GetReservations = () => {
  const ENDPOINT = "http://localhost:8080/reservation";

  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get(ENDPOINT).then((res) => {
      setReservations(res.data);
    });
  }, []);

  return (
    <>
      <h1>GET_all Reservations</h1>
      <Table>
        <TableBody>
          <TableCell>予約ID</TableCell>
          <TableCell>ユーザーID</TableCell>
          <TableCell>ユーザー名</TableCell>
          <TableCell>会議室ID</TableCell>
          <TableCell>会議室名</TableCell>
          <TableCell>開始日時</TableCell>
          <TableCell>終了日時</TableCell>
        </TableBody>
      </Table>
      <div>
        {reservations.map((reservation: Reservation) => (
          <>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>{reservation.id}</TableCell>
                  <TableCell>{reservation.user_id}</TableCell>
                  <TableCell>{reservation.user_name}</TableCell>
                  <TableCell>{reservation.room_id}</TableCell>
                  <TableCell>{reservation.room_name}</TableCell>
                  <TableCell>{reservation.start_dateTime}</TableCell>
                  <TableCell>{reservation.end_dateTime}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <br />
          </>
        ))}
      </div>

    </>
  );
};
