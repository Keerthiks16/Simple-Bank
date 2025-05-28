import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:8081/").then((res) => {
      if (res.data.Status === "Success") {
        setAuth(true);
        setName(res.data.user.user);
        setUser(res.data.user);
        navigate("/");
      } else {
        setAuth(false);
        setMessage(res.data.Error);
      }
    });
  }, [auth]);

  return (
    <div>
      {auth ? (
        <>
          <h1>You are Authorized {name}</h1>
          {console.log(user)}
          <button>Logout</button>
        </>
      ) : (
        <>
          <h1>You are Unauthorized</h1>
          <button>
            <Link to="/login">Login</Link>
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
