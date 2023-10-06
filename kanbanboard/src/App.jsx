import "./App.css";
import { useEffect, useState } from "react";
import Card from "./components/Card";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [grouping, setGrouping] = useState("priority");
  const [sorting, setSorting] = useState("priority");
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((res) => res.json())
      .then((json) => setTickets(json.tickets))
      .catch((e) => {
        console.log("error", e);
      });
  });

  const handleGroupingChange = (e) => {
    setGrouping(e.target.value);
  };
  const handleSortingChange = (e) => {
    setSorting(e.target.value);
  };

  useEffect(() => {
    const groupTickets = () => {
      // status
      if (grouping === "status") {
        const groupedTickets = {};

        tickets.forEach((ticket) => {
          if (!groupedTickets[ticket.status]) {
            groupedTickets[ticket.status] = [];
          }
          groupedTickets[ticket.status].push(ticket);
          // console.log(ticket)
        });

        // console.log("status", groupedTickets);
      }

      // user
      else if (grouping === "user") {
        const groupedTickets = {};

        tickets.forEach((ticket) => {
          if (!groupedTickets[ticket.userId]) {
            groupedTickets[ticket.userId] = [];
          }
          groupedTickets[ticket.userId].push(ticket);
        });

        // console.log("user", groupedTickets);
      }

      // priority
      else if (grouping === "priority") {
        const groupedTickets = {};

        tickets.forEach((ticket) => {
          if (!groupedTickets[ticket.priority]) {
            groupedTickets[ticket.priority] = [];
          }
          groupedTickets[ticket.priority].push(ticket);
        });
        // console.log("priority", groupedTickets);
      }
    };

    const sortTickets = () => {
      // priority
      if (sorting === "priority") {
        const sortedTickets = [...tickets].sort(
          (a, b) => b.priority - a.priority
        );
        // setTickets(sortedTickets);
        // console.log("Priority", sortedTickets);
      }

      // title
      else if (sorting === "title") {
        const sortedTickets = [...tickets].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        // console.log("Title", sortedTickets);
      }
    };
    groupTickets();
    sortTickets();
  }, [grouping, sorting, tickets]);

  return (
    <div className="App">
      <div className="navbar">
        <button
          className="btn"
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          <img src="./images/menu.svg" alt="menu" />
          Display
          <img src="./images/downarrow.png" alt="down arrow" />
        </button>
        {isVisible && (
          <div className="dropdown">
            <div>
              Grouping{" "}
              <select value={grouping} onChange={handleGroupingChange}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div>
              Ordering
              <select value={sorting} onChange={handleSortingChange}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="container">
        <div className="section">
          <div className="section-heading">
            <div className="section-heading-left">
              <img src="./images/profile.png" alt="profile" />
              <p>Akanksha Punjabi</p>
              <span>1</span>
            </div>
            <div className="section-heading-right">
              <img src="./images/plus.png" alt="plus" />
              <img src="./images/menudot.png" alt="menu-dot" />
            </div>
          </div>

          <Card />
          <Card />
          <Card />
        </div>
        <div className="section">
          <div className="section-heading">
            <div className="section-heading-left">
              <img src="./images/profile.png" alt="profile" />
              <p>Akanksha Punjabi</p>
              <span>1</span>
            </div>
            <div className="section-heading-right">
              <img src="./images/plus.png" alt="plus" />
              <img src="./images/menudot.png" alt="menu-dot" />
            </div>
          </div>
          <Card />
        </div>
        <div className="section">
          <div className="section-heading">
            <div className="section-heading-left">
              <img src="./images/profile.png" alt="profile" />
              <p>Akanksha Punjabi</p>
              <span>1</span>
            </div>
            <div className="section-heading-right">
              <img src="./images/plus.png" alt="plus" />
              <img src="./images/menudot.png" alt="menu-dot" />
            </div>
          </div>
          <Card />
        </div>
        <div className="section">
          <div className="section-heading">
            <div className="section-heading-left">
              <img src="./images/profile.png" alt="profile" />
              <p>Akanksha Punjabi</p>
              <span>1</span>
            </div>
            <div className="section-heading-right">
              <img src="./images/plus.png" alt="plus" />
              <img src="./images/menudot.png" alt="menu-dot" />
            </div>
          </div>
          <Card />
        </div>
        <div className="section">
          <div className="section-heading">
            <div className="section-heading-left">
              <img src="./images/profile.png" alt="profile" />
              <p>Akanksha Punjabi</p>
              <span>1</span>
            </div>
            <div className="section-heading-right">
              <img src="./images/plus.png" alt="plus" />
              <img src="./images/menudot.png" alt="menu-dot" />
            </div>
          </div>
          <Card />
        </div>
      </div>

      {/* <div className="card-box">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div> */}
      {tickets && tickets.length > 0 && tickets !== undefined
        ? tickets.map((item, i) => {
            return (
              <div className="card1" key={i}>
                <p>Id = {item.id}</p>
                <p>UserId = {item.userId}</p>
                <p>Title = {item.title}</p>
                <p>Priority = {item.priority}</p>
                <p>Status = {item.status}</p>
                <p>Tags = {item.tag[0]}</p>
              </div>
            );
          })
        : "No Data"}
    </div>
  );
}

export default App;
