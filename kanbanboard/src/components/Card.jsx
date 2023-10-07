import React from "react";
import "./Card.css";

const Card = ({ ticket, isUserSort }) => {
  return (
    <div className="card">
      <div className="card-top">
        <p>{ticket.id}</p>
        {!isUserSort && <img src="./images/profile.png" alt="profile" />}
      </div>
      <h2 className="card-heading">{ticket.title}</h2>
      <div className="card-bottom">
        <img src="./images/menudot.png" alt="menu" />
        <p>
          <img src="./images/dot-grey.png" alt="status" />
          <span>{ticket.tag[0] + " (" + ticket.priority + ")"}</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
