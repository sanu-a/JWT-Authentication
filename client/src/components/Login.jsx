import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  function loginUser() {
    if (!userName.trim()) {
      alert("please enter User name");
      return;
    }
    if (!password) {
      alert("please enter Password");
      return;
    }
    axios
      .post("http://localhost:8008/login", {
        userName,
        password,
      })
      .then((res) => setResponse(res.data));
    // console.log(response);
  }
  function signupUser() {
    if (!userName.trim()) {
      alert("please enter User name");
      return;
    }
    if (!password) {
      alert("please enter Password");
      return;
    }
    axios
      .post("http://localhost:8008/signup", {
        userName,
        password,
      })
      .then((res) => setResponse(res.data));
    // console.log(response);
  }
  return (
    <div className="app">
      <div className="container">
        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="btn">
          <button onClick={loginUser}>Login</button>
          <button onClick={signupUser}>Sign up</button>
        </div>
        <p style={{ color: "red" }}>{response}</p>
      </div>
    </div>
  );
}
export default Login;
