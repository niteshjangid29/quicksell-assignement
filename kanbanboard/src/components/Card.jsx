import React from "react";
import "./Card.css";

const Card = () => {
  return (
    <div className="card">
      <div>
        <p>CAM-3</p>
        <img src="./images/profile.png" alt="profile" />
      </div>
      <h2>Optimize Database Queries for Performance</h2>
      <div>
        <img src="./images/menudot.png" alt="menu" />
        <span>
          <img src="./images/dot-grey.png" alt="status" />
          Feature Request
        </span>
      </div>
    </div>
  );
};

export default Card;
