import "./App.css";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import { statuses, priorities } from "./components/data";
import Loader from "./components/Loader";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [grouping, setGrouping] = useState(
    sessionStorage.getItem("grouping") || "userId"
  );
  const [sorting, setSorting] = useState(
    sessionStorage.getItem("sorting") || "priority"
  );
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [sortedTickets, setSortedTickets] = useState([]);
  const [columnHeaders, setColumnHeaders] = useState([]);

  const APIUrl = "https://api.quicksell.co/v1/internal/frontend-assignment";

  const fetchApiData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setTickets(data.tickets);
      setUsers(data.users);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchApiData(APIUrl);
  }, []);

  const handleGroupingChange = (e) => {
    setGrouping(e.target.value);
  };
  const handleSortingChange = (e) => {
    setSorting(e.target.value);
  };

  // *************** sorted and grouped  ***********

  useEffect(() => {
    const sortTickets = () => {
      const sorted = [...tickets];

      if (sorting === "priority") {
        sorted.sort((a, b) => b.priority - a.priority);
      } else if (sorting === "title") {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
      }
      return sorted;
    };

    const groupTickets = (tickets) => {
      const grouped = {};

      tickets.forEach((ticket) => {
        const key =
          grouping === "status"
            ? ticket.status
            : grouping === "userId"
            ? ticket.userId
            : ticket.priority;

        if (!grouped[key]) {
          grouped[key] = [];
        }
        grouped[key].push(ticket);
      });
      return grouped;
    };

    const sorted = sortTickets();
    const grouped = groupTickets(sorted);

    setSortedTickets(grouped);
    if (grouping === "userId") {
      setColumnHeaders(users);
    } else if (grouping === "status") {
      setColumnHeaders(statuses);
    } else {
      setColumnHeaders(priorities);
    }

    sessionStorage.setItem("grouping", grouping);
    sessionStorage.setItem("sorting", sorting);
  }, [grouping, sorting, tickets, users]);

  return (
    <div className="container">
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
                <option value="userId">User</option>
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

      {loading ? (
        <Loader />
      ) : (
        <div className="container-box">
          {columnHeaders.map((column) => {
            const columnKey = grouping === "status" ? column.name : column.id;
            const columnHeading = column.name;
            const columnTickets = sortedTickets[columnKey] || [];
            const len = columnTickets.length;

            return (
              <div className="section" key={columnKey}>
                <div className="section-heading">
                  <div className="section-heading-left">
                    <img
                      src={
                        grouping === "userId"
                          ? "./images/profile.png"
                          : column.iconUrl
                      }
                      alt="profile"
                    />
                    <p>{columnHeading}</p>
                    <span>{len}</span>
                  </div>
                  <div className="section-heading-right">
                    <img src="./images/plus.png" alt="plus" />
                    <img src="./images/menudot.png" alt="menu-dot" />
                  </div>
                </div>

                {columnTickets.map((ticket, ind) => {
                  return (
                    <Card
                      ticket={ticket}
                      isUserSort={grouping === "userId"}
                      key={ind}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
