import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const MangaList = () => {
    const [mangaList, setMangaList]=useState([]);

    useEffect(() => {
        getMangaList();
      }, []);
    
    const getMangaList=()=>{
        axios.get(`http://localhost:8080/manga/list`)
            .then((response)=>{
                setMangaList(response.data);
            });
    }

    const showSearchResults=(keyword)=>{
        if(keyword.length>=2){
            axios.get(`http://localhost:8080/manga/search/title/${keyword}`)
            .then((response)=>{
                setMangaList(response.data);
            });
        }
        else if(keyword.length===0){
            getMangaList();
        }
    }

    return (
        <div>
            <input type="text" onChange={(e) => showSearchResults(e.target.value)} placeholder="검색할 만화에 포함되는 단어를 입력하세요" />

            <h2>만화 리스트</h2>
            
            {mangaList.map((manga) => (
                <div>
                    <img src={manga.thumbnailUrl} width="100" height="100" /> 
                    <Link to={`/view/manga/${manga.mangaId}`}> <p>{manga.title}</p> </Link>
                    <p>{manga.content}</p>
                </div>
            ))}
        </div>
    );
};

export default MangaList;
