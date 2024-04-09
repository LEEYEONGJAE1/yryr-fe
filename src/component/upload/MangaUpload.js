import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import {deleteS3, uploadS3} from '../aws/S3';
import * as JwtToken from '../JwtToken'

const MangaUpload = () => {
    const [artist, setArtist]=useState([]);
    const [mangaList,setMangaList]=useState([]);
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const [previewUrl, setPreviewUrl]=useState("");
    const [file, setFile]=useState();

    const params=useParams();
    const artistId=params.artistId;
    useEffect(() => {
        JwtToken.setAccessToken();
        getArtist();
        getMangaList();
    }, []);

    const getArtist= async ()=>{
        const response= await axios.get(`${process.env.REACT_APP_SERVER_URL}/artist/${artistId}`);
        setArtist(response.data);
    };

    const uploadFile = async(mangaId) => {
        const key=`thumbnails/${mangaId}`;
        const thumbnailUrl=await uploadS3(key,file);
        const response=await axios.get(`${process.env.REACT_APP_SERVER_URL}/manga/${mangaId}`);
        await axios.put(`${process.env.REACT_APP_SERVER_URL}/manga/${mangaId}`, { title:response.data.title, content:response.data.content, thumbnailUrl:thumbnailUrl.Location });
        getMangaList();
    };

    const deleteFile = async (thumbnailUrl)=>{
        if(thumbnailUrl===null) return;
        const s3url=`https://${process.env.REACT_APP_AWS_S3_BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/`;
        const key=thumbnailUrl.substring(s3url.length);
       
        deleteS3(key);
    }

    const handleChange=(e)=>{
        setFile(e.target.files[0]);
        setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }

    const createManga= async () =>{
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/manga`, { artistId, title, content });
        await uploadFile(response.data.mangaId);
        setTitle("");
        setContent("");
        setPreviewUrl("");
    }
    
    const getMangaList = async () => {
        const response=await axios.get(`${process.env.REACT_APP_SERVER_URL}/manga/artist/${params.artistId}`);
        setMangaList(response.data);
    };

    const deleteManga=async (event, manga) =>{
        deleteFile(manga.thumbnailUrl);
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/manga/${manga.mangaId}`);
        getMangaList();
    };
    
    return (
    <div>
        <h1>작가: {artist.name}</h1>
        <h2>에피소드를 업로드할 만화를 선택해주세요. </h2>
        {mangaList.map((manga) => (
            <div>
                <img src={manga.thumbnailUrl} width="100" height="100" /> 
                <Link to={`/upload/manga/${manga.mangaId}`}> <h3>{manga.title}</h3> </Link> 
                <p>{manga.content}</p>
                <Link to={`/update/manga/${params.artistId}/${manga.mangaId}`}> <p>수정</p> </Link> 
                <button onClick={(event) => deleteManga(event, manga)}>삭제</button>
            </div>
        ))}

        <h2>만화 등록</h2>
        <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="만화 제목을 입력하세요" />
        <input type="text" onChange={(e) => setContent(e.target.value)}placeholder="만화 설명을 입력하세요"/>
        <br></br>
        <input type="file" onChange={handleChange} />
        <img src={previewUrl} />
        <button onClick={createManga}>만화 등록</button>
    </div>
    );
};

export default MangaUpload;