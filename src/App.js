import React, { useState } from "react";
import "./styles.css";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";

export default function App() {
  const [users, setUsers] = useState([]);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await axios.get("/api/users");
      console.log(response);
      setUsers(response.data.users);
      setError(false);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }

  return (
    <div className="App">
      <h1> Data {isError && <span>Error</span>}</h1>
      <FadeLoader loading={isLoading} />
      <button onClick={fetchData}> Click to load data from server </button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
