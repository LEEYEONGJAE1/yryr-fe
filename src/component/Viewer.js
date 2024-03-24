import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [imageList, setImageList] = useState([]);
  const [title, setTitle]=useState([]);
  const params=useParams();
  useEffect(() => {
    axios.get(`http://localhost:8080/episode/${params.episodeId}`)
    .then((response) => {
      setTitle(response.data.title);
      axios.get(response.data.jsonUrl).then((response)=>{
        setImageList(response.data);
      });
    });
  }, []);

  return (
    <div>
    <Container>
      <h1>{title}</h1>
      <ImageList>
        {imageList.map((image, index) => (
            <Image src={image} />
        ))}
      </ImageList>
    </Container>
    </div>
  );
};

export default Viewer;