import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JSZip from 'jszip';
import { useParams, useNavigate } from 'react-router-dom';
import AWS from "aws-sdk";

const EpisodeUpload = () => {
    const [zipfile, setZipfile]=useState();
    const [manga,setManga]=useState([]);
    const [fileList, setFileList] = useState([]);
    const [title,setTitle]=useState("");
    const params=useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/manga/${params.mangaId}`)
        .then((response) => {
            setManga(response.data);
        });
     }, []);

    const createManga=(jsonUrl)=>{
        console.log(title);
        axios
            .post("http://localhost:8080/episode", { mangaId: params.mangaId, title: title, jsonUrl: jsonUrl })
            .then(() => {
                navigate(`/upload/manga/${params.mangaId}`);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const uploadFile = () => {
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
                Body: zipfile, // 파일 객체
            },
        });

        const promise = upload.promise();
        promise.then((data)=>{
            createManga(data.Location);
        });
    };

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
        <h2>만화: {manga.title}</h2>
        <p>에피소드 이미지들을 압축해서 업로드해주세요. 보는 순서대로 이미지 이름을 지정해주세요. (사전순)</p>
        <input type="file" accept=".zip" onChange={onFileChange} />
        <h2>에피소드 제목: {title}</h2>
        <ul>
            {fileList.map((fileName) => (
                <li key={fileName}>{fileName}</li>
            ))}
        </ul>
        <p>등록 전, 에피소드 제목과 이미지 순서를 확인해 주세요.</p>
        <button onClick={uploadFile}>에피소드 등록</button>
        </div>
    );
};

export default EpisodeUpload;
