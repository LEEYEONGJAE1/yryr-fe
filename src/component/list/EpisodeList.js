import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

const EpisodeList = () => {
    const [episodeList,setEpisodeList]=useState([]);
    const params=useParams();
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/episode/manga/${params.mangaId}`)
        .then((response) => {
            setEpisodeList(response.data);
        });
    }, []);
  
    return (
        <div>
        <h1>에피소드 리스트</h1>
        {episodeList.map((episode) => (
            <div>
                <Link to={`/view/episode/${episode.episodeId}`}> {episode.title} </Link>
            </div>
        ))}
        </div>
    );
};

export default EpisodeList;
