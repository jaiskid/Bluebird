import React, { useState,useEffect } from "react";
import "materialize-css/dist/css/materialize.min.css";
import './App.css';
import {userRef} from "./firebase";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Feed from "./components/Feed";
import Navbar from "./components/Resuable/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { firebaseApp } from "./firebase";
import ProfilePage from "./components/ProfilePage";
function App() {
  const [stage,setStage] = useState('');
  const [SignUpSignIn,setSignUpSignIn] = useState("SI");
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        userRef.child(user.uid).once("value", snap => {
          setUserDetails(snap.val());
        });
        setStage("loggedIn");
        setSignUpSignIn("SI");
      } else {
        // No user is signed in.
        console.log("No User Logged In");
        setStage("notLoggedIn");
      }
    });
  }, []);
  const changeState = value => {
    //SI or SU

    setSignUpSignIn(value);
  };
    return (
      <div className="App">
        <Navbar stage={stage} />
        <Router>
          <Route path="/" exact>
            {stage === "loggedIn" && <Feed userDetails={userDetails} />}
            {stage === "notLoggedIn" && SignUpSignIn === "SI" && (
              <SignIn changeState={changeState} />
            )}
            {stage === "notLoggedIn" && SignUpSignIn === "SU" && (
              <SignUp changeState={changeState} />
            )}
          </Route>
          <Route path="/:uid">
            <ProfilePage />
          </Route>
        </Router>
      </div>
  );
}

export default App;
