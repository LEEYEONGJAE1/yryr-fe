import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Login=()=>{
    const logout=()=>{
        localStorage.removeItem('refreshToken');
    }
    return (
        <div>
           
                
                
                <div>
                    <Link to="/signup">회원 가입</Link>
                    <Link to="/signin">로그인</Link>
                </div>
            
                <div>
                    <button onClick={logout}>로그 아웃</button>
                </div>
        </div>
    )
}

export default Login;