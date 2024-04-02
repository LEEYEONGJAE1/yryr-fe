import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import JSZip from 'jszip';
import AWS from "aws-sdk";

const EpisodeUpdate = () => {
    const [manga,setManga]=useState([]);
    const [title,setTitle]=useState("");
    const [zipfile,setZipfile]=useState();
    const [fileList, setFileList] = useState([]);
    const [jsonUrl,setJsonUrl]=useState("");
    const params=useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/episode/${params.episodeId}`)
        .then((response) => {
            setTitle(response.data.title);
            setJsonUrl(response.data.jsonUrl);
        });
        axios.get(`http://localhost:8080/manga/${params.mangaId}`)
        .then((response) => {
            setManga(response.data);
        });
    }, []);
    const uploadFile = () => {
        if(fileList.length==0){
            updateEpisode(jsonUrl);
            return;
        }
        const region = "ap-northeast-2";
        AWS.config.update({
            region: region,
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        });

        const upload = new AWS.S3.ManagedUpload({
            params: {
                Bucket: 'yuruyuri', 
                Key: `mangafile/${manga.title}/${zipfile.name}`,
                Body: zipfile, 
            },
        });

        const promise = upload.promise();
        promise.then((data)=>{
            updateEpisode(data.Location);
        });
    };

    const updateEpisode=(jsonUrl)=>{
        axios.put(`http://localhost:8080/episode/${params.episodeId}`,{title:title,jsonUrl:jsonUrl})
        .then(()=>{navigate(`/upload/manga/${params.mangaId}`)});
    }

    const onFileChange = (e) => {
        setZipfile(e.target.files[0]);
        const file=e.target.files[0];
        const reader = new FileReader();
        setTitle(file.name.split('.')[0]);
        reader.onload = () => {
            const arrayBuffer = reader.result;
            JSZip.loadAsync(arrayBuffer).then((zip) => {
                const files = zip.files;
                const fileNames = Object.keys(files);
                setFileList(fileNames);
            });
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <h2>에피소드 수정</h2>
            <h3>제목 수정</h3>
            <input type="text" onChange={(e) => setTitle(e.target.value)} defaultValue={title} placeholder="에피소드 제목을 입력하세요" />

            <p>에피소드 이미지들을 압축해서 업로드해주세요. 보는 순서대로 이미지 이름을 지정해주세요. (사전순)</p>
            <input type="file" accept=".zip" onChange={onFileChange} />
            <ul>
            {fileList.map((fileName) => (
                <li key={fileName}>{fileName}</li>
            ))}
            </ul>
            <p>이미지 순서를 확인해 주세요.</p>
            <button onClick={uploadFile}>에피소드 수정</button>
        </div>
    );
  };
  
  export default EpisodeUpdate;
  