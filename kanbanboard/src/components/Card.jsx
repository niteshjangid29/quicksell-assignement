import React from "react";
import "./Card.css";
import { priorities } from "./data";

const Card = ({ ticket, grouping }) => {
  return (
    <div className="card">
      <div className="card-top">
        <p>{ticket.id}</p>
        {grouping !== "userId" && (
          <img src="./images/profile.png" alt="profile" />
        )}
      </div>
      <h2 className="card-heading">{ticket.title}</h2>
      <div className="card-bottom">
        {grouping !== "priority" && (
          <img src={priorities[ticket.priority].iconUrl} alt="menu" />
        )}
        <p>
          <img src="./images/dot-grey.png" alt="status" />
          {ticket.tag.map((tags, ind) => {
            return <span id={ind}>{tags}</span>;
          })}
        </p>
      </div>
    </div>
  );
};

export default Card;
