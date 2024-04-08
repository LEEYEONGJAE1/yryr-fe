import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import JSZip from 'jszip';
import * as JwtToken from '../JwtToken'
import { uploadS3, deleteS3 } from '../aws/S3';

const EpisodeUpdate = () => {
    const [title,setTitle]=useState();
    const [zipfile,setZipfile]=useState();
    const [fileList, setFileList] = useState([]);
    const [fileChanged,setFileChanged]=useState(false);
    const [jsonUrl,setJsonUrl]=useState("");
    const params=useParams();
    const navigate = useNavigate();

    useEffect(() => {
        JwtToken.setAccessToken();
        getEpisode();
    },[]);

    const getEpisode= async ()=> {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/episode/${params.episodeId}`);
        setTitle(response.data.title);
        setJsonUrl(response.data.jsonUrl);
    };

    const updateEpisode= async () => {
        if(fileChanged){
            const key=`mangafile/${params.mangaId}/${params.episodeId}.zip`;
            await deleteS3(key);
            await uploadS3(key,zipfile);
        }
        await axios.put(`${process.env.REACT_APP_SERVER_URL}/episode/${params.episodeId}`,{title, jsonUrl});
        navigate(`/upload/manga/${params.mangaId}`);
    };

    const onFileChange = (e) => {
        setZipfile(e.target.files[0]);
        const file=e.target.files[0];
        const reader = new FileReader();
        setFileChanged(true);
        reader.onload = async () => {
            const arrayBuffer = reader.result;
            const zip = await JSZip.loadAsync(arrayBuffer);
            const files = zip.files;
            const fileNames = Object.keys(files);
            setFileList(fileNames);
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <h2>에피소드 수정</h2>
            <h3>제목 수정</h3>
            <input type="text" onChange={(e) => {setTitle(e.target.value);}} defaultValue={title} placeholder="에피소드 제목을 입력하세요" />

            <p>에피소드 이미지들을 압축해서 업로드해주세요. 보는 순서대로 이미지 이름을 지정해주세요. (사전순)</p>
            <input type="file" accept=".zip" onChange={onFileChange} />
            <ul>
            {fileList.map((fileName) => (
                <li key={fileName}>{fileName}</li>
            ))}
            </ul>
            <p>새로운 제목(={title})과 이미지 순서를 확인해 주세요.</p>

            <button onClick={updateEpisode}>에피소드 수정</button>
        </div>
    );
  };
  
  export default EpisodeUpdate;
  