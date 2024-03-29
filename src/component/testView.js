
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JSZip from 'jszip';

const View = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // zip 파일 URL
    const url = 'https://yuruyuri.s3.ap-northeast-2.amazonaws.com/mangafile/%EC%98%A4%EC%98%A4%EB%AC%B4%EB%A1%9C%EA%B0%80/%EC%98%A4%EC%98%A4%EB%AC%B4%EB%A1%9C%EA%B0%80+1%EA%B6%8C.zip';

    axios.get(url, {
      responseType: 'arraybuffer'
    }).then((response) => {
      const arrayBuffer = response.data;
      JSZip.loadAsync(arrayBuffer).then((zip) => {
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
        const imageUrls = imageFiles.map((file) => {
          return URL.createObjectURL(file);
        });

        setImages(imageUrls);
      });
    });
  }, []);

  return (
    <div>
      {images.map((imageUrl) => (
        <img key={imageUrl} src={imageUrl} alt="" />
      ))}
    </div>
  );
};

export default View;
