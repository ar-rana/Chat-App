import React from "react";
import Room from "./Room";
import { Link } from "react-router-dom";

const Roomlist = ({ rooms }) => {
  return (
    <div>
      <h6>RoomList</h6>
      {/* {JSON.stringify(Rooms)} */}
      {rooms &&
        rooms.map((room) => (
          <Link key={room._id} to={"/chat/" + room._id + "/" + room.name}>
            <Room room={room} />
          </Link>
        ))}
    </div>
  );
};

export default Roomlist;
