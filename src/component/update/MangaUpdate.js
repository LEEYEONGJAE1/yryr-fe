import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { uploadS3, deleteS3 } from '../aws/S3';
import * as JwtToken from '../JwtToken'

const MangaUpdate = () => {
    const [previewUrl, setPreviewUrl]=useState("");
    const [file, setFile]=useState();
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const [fileChanged,setFileChanged]=useState(false);
    const [thumbnailUrl,setThumbnailUrl]=useState("");
    const params=useParams();
    const navigate = useNavigate();

    useEffect(() => {
        JwtToken.setAccessToken();
        axios.get(`${process.env.REACT_APP_SERVER_URL}/manga/${params.mangaId}`)
            .then((response) => {
                setTitle(response.data.title);
                setContent(response.data.content);
                setThumbnailUrl(response.data.thumbnailUrl);
            });
    }, []);

    const handleChange= (e)=>{
        setFileChanged(true);
        setFile(e.target.files[0]);
        setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }

    const updateManga= async ()=>{
        if(fileChanged){
            const key=`thumbnails/${params.mangaId}`;
            await deleteS3(key);
            await uploadS3(key,file);
        }
        await axios.put(`${process.env.REACT_APP_SERVER_URL}/manga/${params.mangaId}`, { title, content, thumbnailUrl });
        navigate(`/upload/artist/${params.artistId}`);
    }

    return (
          <div>
            <h2>만화 수정</h2>
            <input type="text" onChange={(e) => setTitle(e.target.value)} defaultValue={title} placeholder="만화 제목을 입력하세요" />
            <input type="text" onChange={(e) => setContent(e.target.value)} defaultValue={content} placeholder="만화 설명을 입력하세요"/>
            <p>현재 thumbnail</p>
            <img src={thumbnailUrl} />
            
            <p>새로운 썸네일 등록하기</p>
            <br></br>
            <input type="file" onChange={handleChange} />
            <img src={previewUrl} />
            <button onClick={updateManga}>만화 수정</button>
          </div>
    );
  };
  
  export default MangaUpdate;
  