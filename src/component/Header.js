import React from 'react';
import { Link } from "react-router-dom";
import Login from './login/Login'
const Header = () => {
  return (
    <header>
      <Link to="/"><h1>YRYR</h1></Link>
      <Login></Login>
    </header>
  );
};

export default Header;
