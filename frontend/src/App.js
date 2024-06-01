import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import NavBar from "./NavBar";
import NotFound from "./NotFound";
import JoblyApi from "./Api";
import Companies from "./Companies";
import Company from "./Company";
import Jobs from "./Jobs";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";

const user = {
  "username": "testadmin",
  "firstName": "Test",
  "lastName": "Admin!",
  "email": "joel@joelburton.com",
  "isAdmin": true
};

// const user = false;

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // const [user, setUser] = useState({user: false});
  const [companies, setCompanies] = useState({});
  const [jobs, setJobs] = useState({});


  useEffect(() => {
    async function getItems() {

      let companies = await JoblyApi.getAllCompanies();
      let jobs = await JoblyApi.getAllJobs();

      setCompanies(companies);
      setJobs(jobs);

      setIsLoading(false);
    }
    getItems();

  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar user={user} />
        <main>
          <Switch>
            <Route exact path="/">
              <Home user={user}/>
            </Route>
            <Route exact path="/companies">
              <Companies companies={companies} />
            </Route>
            <Route path="/companies/:handle">
              <Company />
            </Route>
            <Route path="/jobs">
              <Jobs jobs={jobs} />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/profile">
              <Profile user={user} />
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