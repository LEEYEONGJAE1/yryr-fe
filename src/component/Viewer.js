import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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

  useEffect(() => {
    axios.get('/dummy/oomuroke.json').then((response) => {
      setImageList(response.data);
    });
  }, []);

  return (
    <Container>
      <ImageList>
        {imageList.map((image, index) => (
            <Image src={image} />
        ))}
      </ImageList>
    </Container>
  );
};

export default Viewer;