import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import NavBar from "./NavBar";
import NotFound from "./NotFound";
import JoblyApi from "./Api";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import { jwtDecode } from "jwt-decode";
import useLocalStorage from "./useLocalStorage";

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(false);

  const [token, setToken] = useLocalStorage("token", null);

  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      return {success: false, errors}
    }
  }

  async function pathUser(pathData) {
    try {
      const res = await JoblyApi.updateUser(currentUser.username, pathData);
      setCurrentUser(res);
      return {success: true}
    } catch (e) {
      return {success: false}
    }
  }

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwtDecode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          setCurrentUser(null);
        }
      }
    }

    setIsLoading(false);
    getCurrentUser();

  }, [token]);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar user={currentUser} logout={logout} />
        <main>
          <Switch>
            <Route exact path="/">
              <Home user={currentUser} />
            </Route>
            <Route exact path="/companies">
              <CompanyList user={currentUser} />
            </Route>
            <Route path="/companies/:handle">
              <CompanyDetail user={currentUser} />
            </Route>
            <Route path="/jobs">
              <JobList user={currentUser} />
            </Route>
            <Route path="/login">
              <Login login={login} />
            </Route>
            <Route path="/signup">
              <SignUp signup={signup} />
            </Route>
            <Route path="/profile">
              <Profile user={currentUser} pathUser={pathUser} />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}


export default App;