import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const EpisodeUpload = () => {
    const [episodeList,setEpisodeList]=useState([]);
    const params=useParams();
    useEffect(() => {
    axios.get(`http://localhost:8080/episode/manga/${params.mangaId}`)
        .then((response) => {
            setEpisodeList(response.data);
        });
    }, []);
  
    return (
        <div>
        <h1>에피소드 리스트</h1>
        {episodeList.map((episode) => (
            <p>{episode.title}</p> 
        ))}
        </div>

    );
};

export default EpisodeUpload;