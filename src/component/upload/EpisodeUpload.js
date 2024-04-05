import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JSZip from 'jszip';
import { useParams, useNavigate } from 'react-router-dom';
import { uploadS3} from '../aws/S3';
import * as JwtToken from '../JwtToken'

const EpisodeUpload = () => {
    const [zipfile, setZipfile]=useState();
    const [manga,setManga]=useState([]);
    const [fileList, setFileList] = useState([]);
    const [title,setTitle]=useState("");
    const params=useParams();
    const navigate = useNavigate();

    useEffect(() => {
        JwtToken.setAccessToken();
        axios.get(`http://localhost:8080/manga/${params.mangaId}`)
        .then((response) => {
            setManga(response.data);
        });
     }, []);

    const createEpisode=async ()=>{
        const response=await axios.post("http://localhost:8080/episode", { mangaId: params.mangaId, title: title });
        uploadFile(response.data.episodeId);
        navigate(`/upload/manga/${params.mangaId}`);
    }

    const uploadFile =async (episodeId) => {
        const key=`mangafile/${manga.mangaId}/${episodeId}.zip`;
        const response= await uploadS3(key,zipfile);
        await axios.put(`http://localhost:8080/episode/${episodeId}`,{ title: title , jsonUrl:response.Location});
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
        <button onClick={createEpisode}>에피소드 등록</button>
        </div>
    );
};

export default EpisodeUpload;
