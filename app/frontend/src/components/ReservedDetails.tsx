import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";

const ReservedDetails: React.FC = () => {
  const selectedBooking = {
    room: "room1",
    user: "Haruko",
    date: "2023/1/1",
    start_time: "10:00",
    end_time: "11:00",
  };
  const rows = [
    { item: "Room", data: selectedBooking.room },
    { item: "user", data: selectedBooking.user },
    { item: "date", data: selectedBooking.date },
    { item: "start", data: selectedBooking.start_time },
    { item: "end", data: selectedBooking.end_time },
  ];

  if (!selectedBooking.room) {
    return null;
  }

  return (
    <>
      <h2>予約詳細</h2>
      <Table>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.item}>
              <TableCell align="center">
                <strong>{row.item}</strong>
              </TableCell>
              <TableCell align="center">{row.data}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ReservedDetails;
