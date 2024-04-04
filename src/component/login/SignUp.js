import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [passwordCheck, setPasswordCheck]=useState("");
    const [nickname,setNickname]=useState("");
    const [idAlertMessage,setIdAlertMessage]=useState("");
    const [passwordAlertMessage,setPasswordAlertMessage]=useState("");
    const navigate = useNavigate();

    const signup=async ()=>{
        if(checkPassword()===false) return;
        const response= await axios.post(`http://localhost:8080/member/signup`,{username,password,nickname});
        if(response.status===200){
            navigate('/');
        }
        console.log(response);
    };

    const checkPassword=()=>{
        if(password.length===0){
            setPasswordAlertMessage("비밀번호를 입력해 주세요.");
            return false;
        }
        else if(passwordCheck===password){
            setPasswordAlertMessage("비밀번호가 일치합니다.");
            return true;
        }
        else{
            setPasswordAlertMessage("비밀번호가 일치하지 않습니다.");
            return false;
        }
    }
    
    return (
        <div>
            <h2>회원 가입</h2>
            <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="아이디를 입력하세요" />
            <p>{idAlertMessage}</p>
            <input type='password' onChange={(e) => setPassword(e.target.value)}  placeholder="비밀번호를 입력하세요"/>
            <input type='password' onChange={(e) => setPasswordCheck(e.target.value)}  placeholder="비밀번호를 확인하세요"/>
            <p>{passwordAlertMessage}</p>
            <input type="text" onChange={(e) => setNickname(e.target.value)} placeholder="닉네임을 입력하세요" />
            <button onClick={signup}>회원 가입</button>
        </div>
    );
};

export default SignUp;
