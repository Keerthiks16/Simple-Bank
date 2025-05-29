import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toast";
import { Toaster } from "react-hot-toast";
import { UserContext } from "./context/UserContext";
import Blogin from "./pages/Blogin";

const App = () => {
  const { user, loading } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />}
        ></Route>
        <Route path="/blogin" element={<Blogin />}></Route>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        ></Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
