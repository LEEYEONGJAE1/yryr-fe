import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const ArtistList = () => {
    const [artistList, setArtistList]=useState([]);

    useEffect(() => {
        getArtistList();
    }, []);
    
    const getArtistList= ()=>{
        axios.get('http://localhost:8080/artist/list')
            .then((response) => {
                setArtistList(response.data);
            });
    }

    return (
        <div>
            <h2>작가 리스트</h2>
            {artistList.map((artist) => (
                <div>
                    <Link to={`/view/artist/${artist.artistId}`}> {artist.name} </Link>
                </div>
            ))}
        </div>
    );
};

export default ArtistList;
