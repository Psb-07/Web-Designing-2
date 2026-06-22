import { useState } from "react";

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registered, setRegistered] = useState(false);

  const handleRegister = () => {

    if(name && email && password){
      setRegistered(true);
    }
  };

  return (
    <div className="container">

      <div className="form-box">

        <h1>Registration Form</h1>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>
          Register
        </button>

        {registered && (
          <>
            <h2>Registration Successful!</h2>

            <div className="users">

              <h3>Registered Users</h3>

              <ul>
                <li>
                  {name} - {email}
                </li>
              </ul>

            </div>
          </>
        )}

      </div>

      <div className="student-info">

        <h3>Shivam Kumar Srivastava</h3>

        <h4>Class: CSE-26</h4>

        <h4>Admission No: 2025B01010946</h4>

      </div>

    </div>
  );
}

export default App;