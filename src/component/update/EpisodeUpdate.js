import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EpisodeUpdate = () => {
    const [episode,setEpisode]=useState([]);
    const params=useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/episode/${params.episodeId}`)
        .then((response) => {
            setEpisode(response.data);
        });
    }, []);

    return (
          <div>
            
          </div>
    );
  };
  
  export default EpisodeUpdate;
  