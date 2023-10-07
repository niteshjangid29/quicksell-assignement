import "./App.css";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import { statuses, priorities } from "./components/data";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [grouping, setGrouping] = useState("userId");
  const [sorting, setSorting] = useState("priority");
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [sortedTickets, setSortedTickets] = useState([]);
  const [columnHeaders, setColumnHeaders] = useState([]);

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((res) => res.json())
      .then((json) => {
        setTickets(json.tickets);
        setUsers(json.users);
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, []);

  const handleGroupingChange = (e) => {
    const selectedGroup = e.target.value;
    setGrouping(selectedGroup);

    if (selectedGroup === "status") {
      setColumnHeaders(statuses);
    } else if (selectedGroup === "userId") {
      setColumnHeaders(users);
    } else {
      setColumnHeaders(priorities);
    }
  };
  const handleSortingChange = (e) => {
    setSorting(e.target.value);
  };

  // **************************  sorted and group

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

    console.log(grouped);
    setSortedTickets(grouped);
    setColumnHeaders(users);
    // setColumnHeaders(statuses);
  }, [grouping, sorting, tickets, users]);
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

      <div className="container">
        {columnHeaders.map((column) => {
          const columnKey = grouping === "status" ? column : column.id;
          // const columnHeading = grouping === "status" ? column : column.name;
          const userTickets = sortedTickets[columnKey] || [];
          const len = userTickets.length;

          return (
            <div className="section" key={columnKey}>
              <div className="section-heading">
                <div className="section-heading-left">
                  <img src="./images/profile.png" alt="profile" />
                  {/* <p>{columnHeading}</p> */}
                  <span>{len}</span>
                </div>
                <div className="section-heading-right">
                  <img src="./images/plus.png" alt="plus" />
                  <img src="./images/menudot.png" alt="menu-dot" />
                </div>
              </div>

              {userTickets.map((ticket, ind) => {
                return <Card ticket={ticket} key={ind} />;
              })}
            </div>
          );
        })}
        {/* <div className="section">
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
        </div> */}
        {/* <div className="section">
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
        </div> */}
        {/* <div className="section">
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
          {Object.keys(sortedTickets).map((groupkey) => {
            return (
              <div key={groupkey}>
                <h2>
                  {grouping} : {groupkey}
                </h2>
                {sortedTickets[groupkey].map((ticket, ind) => {
                  return (
                    <div key={ind}>
                      <Card ticket={ticket} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>*/}
      </div>

      {/* {tickets && tickets.length > 0 && tickets !== undefined
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
        : "No Data"} */}
    </div>
  );
}

export default App;
