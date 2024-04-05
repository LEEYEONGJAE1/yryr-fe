import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as JwtToken from '../JwtToken'

const ArtistUpdate = () => {
    const [name,setName]=useState();
    const [content,setContent]=useState("");
    const params=useParams();
    const navigate = useNavigate();

    useEffect(() => {
        JwtToken.setAccessToken();
        axios.get(`http://localhost:8080/artist/${params.artistId}`)
            .then((response) => {
            setName(response.data.name);
            setContent(response.data.content);
        });
    }, []);

    const updateArtist=()=>{
        axios.put(`http://localhost:8080/artist/${params.artistId}`,{name:name,content:content})
        .then(()=>{navigate(`/upload/artist/list`)});
    };
    
    return (
        <div>
            <h2>작가 수정</h2>
            <input type="text" onChange={(e) => setName(e.target.value)} defaultValue={name} placeholder="만화 제목을 입력하세요" />
            <input type="text" onChange={(e) => setContent(e.target.value)} defaultValue={content} placeholder="만화 설명을 입력하세요"/>
            <button onClick={updateArtist}>작가 수정</button>
        </div>
    );
};

export default ArtistUpdate;
