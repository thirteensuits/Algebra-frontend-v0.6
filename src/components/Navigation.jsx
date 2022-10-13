import React from "react";
import { NavLink } from "react-router-dom";
import { Provider } from "react-redux";
import store4 from "../redux/store";
import Login from '../functions/Login'
import img from './images/algebra_logo.png';
import { NavHashLink as Link } from 'react-router-hash-link';




function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-light" style={{backgroundColor: "#ebecf0"}}>
        <div className="container navbar_header">
          <NavLink className="image navbar-brand" to="/">
          <img src={img} width="150px" />
          </NavLink>
            <ul className="right navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to='/'>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/#thesis'>Thesis</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/#contact'>Contact</Link>
            </li>
            </ul>
            <ul className="navbar-nav">
            <li className="outside nav-item">
              <Provider store={store4}>
              <Login />
              </Provider>
            </li>
            </ul>
          </div>
      </nav>
    </div>
  );
}

export default Navigation;
