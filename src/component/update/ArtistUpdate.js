import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const ArtistUpdate = () => {
    const [artist,setArtist]=useState([]);
    const params=useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/artist/${params.artistId}`)
            .then((response) => {
            setArtist(response.data);
        });
    }, []);
    
    
  return (
        <div>

        </div>
  );
};

export default ArtistUpdate;
