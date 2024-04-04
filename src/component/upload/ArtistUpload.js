import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import * as JwtToken from '../JwtToken'

const ArtistUpload = () => {
    const [artistList, setArtistList]=useState([]);
    const [name, setName]=useState("");
    const [content, setContent]=useState("");

    useEffect(() => {
        getArtistList();
      }, []);
    
    const createArtist = () => {
        if(name.length===0) return;
        JwtToken.setAccessToken();
        axios
            .post("http://localhost:8080/artist", { name, content })
            .then(() => {
                getArtistList();
                setName("");
                setContent("");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getArtistList= ()=>{
        axios.get('http://localhost:8080/artist/list')
            .then((response) => {
                setArtistList(response.data);
            });
    };

    const deleteArtist=(event,artistId)=>{
        axios.delete(`http://localhost:8080/artist/${artistId}`)
        .then(() =>{
            getArtistList();
        });
    };

    return (
        <div>
            <h2>작가 리스트</h2>

            {artistList.map((artist) => (
                <div>
                    <Link to={`/upload/artist/${artist.artistId}`}> <h3>{artist.name}</h3></Link>
                    <p>{artist.content}</p>
                    <Link to={`/update/artist/${artist.artistId}`}> <p>수정</p> </Link>
                    <button onClick={(event) => deleteArtist(event, artist.artistId)}>삭제</button>
                </div>
            ))}

            <h2>작가 등록</h2>
            <input type="text" onChange={(e) => setName(e.target.value)} placeholder="작가 이름을 입력하세요"/>
            <input type="text" onChange={(e) => setContent(e.target.value)} placeholder="작가 설명을 입력하세요"/>
            <button onClick={createArtist}>작가 등록</button>

        </div>
    );
};

export default ArtistUpload;
