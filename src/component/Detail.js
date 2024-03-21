import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PinchZoom from 'react-pinch-zoom';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const InfoWrapper = styled.div`
  width: 100%;
  height: 100px;
  padding: 20px;
  border-bottom: 1px solid #ccc;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;

const Artist = styled.p`
  font-size: 16px;
  margin-top: 10px;
`;

const Description = styled.p`
  font-size: 14px;
  margin-top: 10px;
`;

const ImageViewer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const App = () => {
  const [data, setData] = useState([]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedImage, setZoomedImage] = useState('');

  useEffect(() => {
    axios.get('[JSON URL]').then((response) => {
      setData(response.data);
    });
  }, []);

  const handleImageClick = () => {
    setZoomedImage(data.thumbnail);
    setIsZoomed(true);
  };

  const handleZoomClose = () => {
    setIsZoomed(false);
  };

  return (
    <Container>
      <InfoWrapper>
        <Title>{data.title}</Title>
        <Artist>{data.artist}</Artist>
        <Description>{data.description}</Description>
      </InfoWrapper>
      <ImageViewer>
        <Image src={data.thumbnail} onClick={handleImageClick} />
      </ImageViewer>
      {isZoomed && (
        <PinchZoom
          image={zoomedImage}
          onClose={handleZoomClose}
        />
      )}
    </Container>
  );
};

export default App;