import React, { useState, useEffect } from "react";

function Registration() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const newUser = {
      name,
      email,
    };

    setUsers([...users, newUser]);

    setMessage("Registration Successful!");

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Registration Form</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">Register</button>
      </form>

      <h3 style={{ color: "green" }}>
        {message}
      </h3>

      <h2>Registered Users</h2>

      <ul>
        {users.slice(0, 5).map((user, index) => (
          <li key={index}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Registration;