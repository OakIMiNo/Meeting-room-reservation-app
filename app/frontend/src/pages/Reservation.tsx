import { useAuth } from "../context/auth";
import { PostReservation } from "../components/PostReservation";
import { GetReservations } from "../components/GetReservations";

const Reservation: React.FC = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <>
      <div className="App">
        <h1>新規予約</h1>
        {/* <h1>{user.username}</h1> */}
        <PostReservation />
      </div>
      <GetReservations />
    </>
  );
};

export default Reservation;
