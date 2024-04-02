import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AWS from "aws-sdk";

const MangaUpdate = () => {
    const [previewUrl, setPreviewUrl]=useState("");
    const [file, setFile]=useState();
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const [thumbnailUrl,setThumbnailUrl]=useState("");
    const params=useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/manga/${params.mangaId}`)
            .then((response) => {
                setTitle(response.data.title);
                setContent(response.data.content);
                setThumbnailUrl(response.data.thumbnailUrl);
            });
    }, []);

    const handleChange= (e)=>{
        setFile(e.target.files[0]);
        setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }

    const uploadFile = () => {
        if(title.length===0) return;

        AWS.config.update({
            region: 'yuruyuri',
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        });

        if(previewUrl.length==0) {
            updateManga(thumbnailUrl);
            return;
        }

        const upload = new AWS.S3.ManagedUpload({
            params: {
                Bucket: 'yuruyuri', // 버킷 이름
                Key: `thumbnails/${file.name}`, // 유저 아이디
                Body: file, // 파일 객체
            },
        });

        const promise = upload.promise();
        promise.then((data)=>{
            updateManga(data.Location);
        });
    };

    const updateManga= (thumbnailUrl)=>{
        axios.put(`http://localhost:8080/manga/${params.mangaId}`, { title, content, thumbnailUrl })
        .then(()=>{navigate(`/upload/artist/${params.artistId}`)});
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
            <button onClick={uploadFile}>만화 수정</button>
          </div>
    );
  };
  
  export default MangaUpdate;
  