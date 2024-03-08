import React from "react";

const Room = ({room}) => {
  return (
    <div>
      <div className="row">
          <div className="card center-align">
              <span className="card-title">{room.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Room;
