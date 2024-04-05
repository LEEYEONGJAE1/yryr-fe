import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {LoginContext} from './LoginProvider';

const Login=()=>{
    const navigate=useNavigate();

    const {isLoggedIn,setIsLoggedIn}=useContext(LoginContext);

    const logout=()=>{
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        setIsLoggedIn(false);
        navigate('/');
    }
    return (
        <div> 
            { isLoggedIn ? 
            <button onClick={logout}>로그 아웃</button>
            :
            <div>
                <Link to="/signup">회원 가입</Link>
                <Link to="/signin">로그인</Link>
            </div>
            }
        </div>
    )
}

export default Login;