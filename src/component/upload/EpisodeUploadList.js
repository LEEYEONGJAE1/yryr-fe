import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import {deleteS3, uploadS3} from '../aws/S3';
import * as JwtToken from '../JwtToken'

const EpisodeUploadList = () => {
    const [episodeList,setEpisodeList]=useState([]);
    const params=useParams();

    useEffect(() => {
        JwtToken.setAccessToken();
        getEpisodeList();
    }, []);

    const getEpisodeList=async ()=>{
        const response = await axios.get(`http://localhost:8080/episode/manga/${params.mangaId}`);
        setEpisodeList(response.data);
    };

    const deleteEpisode=async(event,episode)=>{
        await axios.delete(`http://localhost:8080/episode/${episode.episodeId}`);
        const s3url='https://yuruyuri.s3.ap-northeast-2.amazonaws.com/';
        const key=episode.jsonUrl.substring(s3url.length);
        console.log(key);
        await deleteS3(key);
        getEpisodeList();
    };
    
    return (
        <div>
        <h2>에피소드 리스트</h2>
        <ul>
            {episodeList.map((episode) => (
                <li>
                    {episode.title}
                    <Link to={`/update/episode/${params.mangaId}/${episode.episodeId}`}>수정</Link>
                    <button onClick={(event)=>deleteEpisode(event,episode)}>삭제</button>
                </li>
            ))}
        </ul>
        <Link to={`/upload/episode/${params.mangaId}`}><h3>새 에피소드 업로드</h3></Link>
        </div>
    );
};

export default EpisodeUploadList;