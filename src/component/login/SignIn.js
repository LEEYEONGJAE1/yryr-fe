import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {LoginContext} from './LoginProvider';
import * as JwtToken from '../JwtToken';

const SignIn = () => {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    const {isLoggedIn,setIsLoggedIn}=useContext(LoginContext);

    const navigate = useNavigate();

    const signin=async ()=>{
        const response = await axios.post(`http://localhost:8080/member/signin`,{username,password});
        localStorage.setItem('refreshToken',response.data.refreshToken);
        localStorage.setItem('accessToken',response.data.accessToken);
        setIsLoggedIn(true);
        navigate('/');
    };
    
    return (
        <div>
            <h2>로그인</h2>
            <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="아이디를 입력하세요" />
            <input type='password' onChange={(e) => setPassword(e.target.value)}  placeholder="비밀번호를 입력하세요"/>
            <button onClick={signin}>로그인</button>
        </div>
    );
};

export default SignIn;
