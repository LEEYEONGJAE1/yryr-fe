import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const MangaList = () => {
    const [mangaList, setMangaList]=useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/manga/list')
        .then((response) => {
            setMangaList(response.data);
        });
      }, []);
    
    return (
        <div>
            <h2>만화 리스트</h2>
            {mangaList.map((manga) => (
                <div>
                    <Link to={`/manga/${manga.mangaId}`}> {manga.title} </Link>
                </div>
            ))}
        </div>
    );
};

export default MangaList;
