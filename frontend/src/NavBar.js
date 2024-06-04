import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";


function NavBar({user, logout}) {
  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>

        <Nav className="ml-auto" navbar>
          {!user ?
            <NavItem>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
            </NavItem> :
            <NavItem>
              <NavLink to="/companies">Companies</NavLink>
              <NavLink to="/jobs">Jobs</NavLink>
              <NavLink to="/profile">Profile</NavLink>
              <NavLink to onClick={logout}>Log Out {user.username}</NavLink>
            </NavItem> 
          }
        </Nav>
      </Navbar>
    </div>
  );
}


export default NavBar;
