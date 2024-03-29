import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const EpisodeUploadList = () => {
    const [episodeList,setEpisodeList]=useState([]);
    const params=useParams();
    useEffect(() => {
        getEpisodeList();
    }, []);
    const getEpisodeList=()=>{
        axios.get(`http://localhost:8080/episode/manga/${params.mangaId}`)
        .then((response) => {
            setEpisodeList(response.data);
        });
    };
    const deleteEpisode=(event,episodeId)=>{
        axios.delete(`http://localhost:8080/episode/${episodeId}`)
        .then(() =>{
            getEpisodeList();
        });
    };
    return (
        <div>
        <h2>에피소드 리스트</h2>
        <ul>
            {episodeList.map((episode) => (
                <li>{episode.title} <button onClick={(event)=>deleteEpisode(event,episode.episodeId)}>삭제</button></li>
            ))}
        </ul>
        <Link to={`/upload/episode/${params.mangaId}`}><h3>새 에피소드 업로드</h3></Link>

        </div>
    );
};

export default EpisodeUploadList;