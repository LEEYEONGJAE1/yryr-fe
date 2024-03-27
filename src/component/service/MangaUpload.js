import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import AWS from "aws-sdk";

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

       getArtist();
       getMangaList();
    }, []);

    const getArtist= ()=>{
        axios.get(`http://localhost:8080/artist/${artistId}`)
        .then((response) => {
          setArtist(response.data);
        });
    };

    const uploadFile = () => {
        const region = "ap-northeast-2";
        const bucket = process.env.S3_BUCKET_NAME;
        if(title.length===0) return;

        AWS.config.update({
            region: region,
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        });

        const upload = new AWS.S3.ManagedUpload({
            params: {
                Bucket: bucket, // 버킷 이름
                Key: `thumbnails/${title}.jpeg`, // 유저 아이디
                Body: file, // 파일 객체
            },
        });

        const promise = upload.promise();
        promise.then(()=>{
            const thumbnailUrl=`https://yuruyuri.s3.ap-northeast-2.amazonaws.com/thumbnails/${title}.jpeg`;
            createManga(thumbnailUrl);
        });
      };


    const handleChange=(e)=>{
        setFile(e.target.files[0]);
        setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }


    const createManga= (thumbnailUrl) =>{
        if(title.length===0) return;
        console.log(thumbnailUrl);
        axios
            .post("http://localhost:8080/manga", { artistId, title, content , thumbnailUrl })
            .then(() => {
                getMangaList();
                setTitle("");
                setContent("");
                setPreviewUrl("");
            })
            .catch((error) => {
                console.error(error);
            });
    }
    
    
    const getMangaList = () => {
        axios.get(`http://localhost:8080/manga/artist/${params.artistId}`)
        .then((response)=>{
            setMangaList(response.data);
        });
    };

    const deleteManga= (event, mangaId) =>{
        
        axios.delete(`http://localhost:8080/manga/${mangaId}`)
        .then(() =>{
            getMangaList();
        });
    };
    
    return (
    <div>
        <h1>작가: {artist.name}</h1>
        <h2>에피소드를 업로드할 만화를 선택해주세요. </h2>
        {mangaList.map((manga) => (
            <div>
                <img src={manga.thumbnailUrl} width="100" height="100" /> 
                <Link to={`/upload/episode/${manga.mangaId}`}> <h3>{manga.title}</h3> </Link>
                <p>{manga.content}</p>
                <button onClick={(event) => deleteManga(event, manga.mangaId)}>삭제</button>
            </div>
        ))}

        <h2>만화 등록</h2>
        <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="만화 제목을 입력하세요" />
        <input type="text" onChange={(e) => setContent(e.target.value)}placeholder="만화 설명을 입력하세요"/>
        <br></br>
        <input type="file" onChange={handleChange} />
        <img src={previewUrl} />
        <button onClick={uploadFile}>만화 등록</button>
    </div>
    );
};

export default MangaUpload;