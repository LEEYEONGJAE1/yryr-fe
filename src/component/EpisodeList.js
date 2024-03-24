import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

const EpisodeList = () => {
    const [episodeList,setEpisodeList]=useState([]);
    const params=useParams();
    useEffect(() => {
    axios.get(`http://localhost:8080/episode/manga/${params.mangaId}`)
    .then((response) => {
        console.log(response.data);
        setEpisodeList(response.data);
    });
  }, []);
    return (
        <div>
        <h1>에피소드 리스트</h1>
        {episodeList.map((episode) => (
            <div>
                <Link to={`/episode/${episode.episodeId}`}> {episode.title} </Link>
            </div>
        ))}
        </div>
    );
};

export default EpisodeList;
