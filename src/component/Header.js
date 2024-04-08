import React from 'react';
import { Link } from "react-router-dom";
import Login from './login/Login'
import { useContext } from "react";
import { LoginContext } from "./login/LoginProvider";
const Header = () => {
  const {isLoggedIn,setIsLoggedIn}=useContext(LoginContext);
  return (
    <header>
      <Link to="/"><h1>YRYR</h1></Link>
      <Login></Login>
      {isLoggedIn &&
          <Link to ="/upload/artist/list">만화 업로드/수정하기</Link>
      }
    </header>
  );
};

export default Header;
