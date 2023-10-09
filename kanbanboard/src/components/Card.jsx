import React from "react";
import "./Card.css";
import { priorities, statusMap, userMap } from "./data";

const Card = ({ ticket, grouping, users }) => {
  const user = users.find((user) => user.id === ticket.userId);

  return (
    <div className="card">
      <div className="card-top">
        <p>{ticket.id}</p>
        {grouping !== "userId" && (
          <div className="profile">
            <img src={userMap[ticket.userId]} alt="profile" />
            <span className={user.available ? "user-available" : ""}></span>
          </div>
        )}
      </div>
      <div className="card-middle">
        {grouping !== "status" && <img src={statusMap[ticket.status]} alt="" />}
        <h2 className="card-heading">{ticket.title + ticket.status}</h2>
      </div>
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
