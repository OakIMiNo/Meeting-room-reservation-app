import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";

type Reservation = {
  id: number;
  user_id: number;
  room_id: number;
  user_name: string;
  room_name: string;
  date: string;
  start_time: string;
  end_time: string;
};

export const GetReservations = () => {
  const ENDPOINT = "http://localhost:8080/reservation";

  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get(ENDPOINT).then((res) => {
      setReservations(res.data);
    })
    .catch((error) => {
      console.log(error.status)
    });
  }, []);

  return (
    <>
      <h1>予約一覧</h1>
      <Table>
        <TableBody>
          <TableCell>予約ID</TableCell>
          <TableCell>ユーザー名</TableCell>
          <TableCell>会議室</TableCell>
          <TableCell>予約日</TableCell>
          <TableCell>開始時間</TableCell>
          <TableCell>終了時間</TableCell>
        </TableBody>
      </Table>
      <div>
        {reservations.map((reservation: Reservation) => (
          <>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>{reservation.id}</TableCell>
                  <TableCell>{reservation.user_name}</TableCell>
                  <TableCell>{reservation.room_name}</TableCell>
                  <TableCell>{reservation.date}</TableCell>
                  <TableCell>{reservation.start_time}</TableCell>
                  <TableCell>{reservation.end_time}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <br />
          </>
        ))}
      </div>
      <p>MUIのずれが気になる</p>
    </>
  );
};
