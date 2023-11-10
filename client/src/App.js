import { Routes, Route } from "react-router-dom";
import "./App.css";
import { About } from "./Components/About";
import { Home } from "./Components/Home";
import Navbar from "./Components/Navbar";
import NoteState from "./Context/notes/NoteState";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);
  const setAlertText = (msg, type) => {
    setAlert({
      msg: msg,
      type: type,
    });
    setTimeout(()=>{
      setAlert(null);
    },1500)
  };
  return (
    <>
      <NoteState>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home setAlertText={setAlertText}/>} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login setAlertText={setAlertText}/>} />
            <Route exact path="/signup" element={<SignUp setAlertText={setAlertText}/>} />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
