import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JSZip from 'jszip';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ImageList = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const Image = styled.img`
  max-width: 100%;
  display:block;
  margin-left:auto;
  margin-right:auto;
`;

const Viewer = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [episode, setEpisode]=useState([]);
  const params=useParams();

  const getEpisode= () => {
    axios.get(`http://localhost:8080/episode/${params.episodeId}`)
    .then((response) => {
      setEpisode(response.data);
      showEpisodeImages(response.data.jsonUrl);
    });
  }
  const showEpisodeImages=(zipUrl)=>{
    axios.get(zipUrl, {
      responseType: 'arraybuffer'
    }).then((response) => {
      const arrayBuffer = response.data;
      JSZip.loadAsync(arrayBuffer).then(async (zip) => {
        const files = zip.files;
        const imageFiles = [];
        // 이미지 파일만 추출
        for (const fileName of Object.keys(files)) {
          const file = files[fileName];
          if (file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            imageFiles.push(file);
          }
        }

        // 이미지 URL 목록 생성
        setImageUrls( await Promise.all(imageFiles.map(async (file) => {
            const data = await file.async('blob').then((blob) => {return URL.createObjectURL(blob); });
            return data;
        })));
      });
    });
  }

  useEffect(() => {
    getEpisode();
  }, []);

  return (
    <div>
    <h2>{episode.title}</h2>
    <Container>
      <ImageList>
      {imageUrls.map((imageurl) => (
        <Image src={imageurl} />
      ))}
      </ImageList>
    </Container>
    </div>
  );
};

export default Viewer;
