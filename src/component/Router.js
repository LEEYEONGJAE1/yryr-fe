import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState, createContext } from "react";
import Viewer from './upload/Viewer';
import MangaList from './list/MangaList';
import EpisodeList from './list/EpisodeList';
import Main  from './Main';
import ArtistUpload from './upload/ArtistUpload';
import MangaUpload from './upload/MangaUpload';
import EpisodeUploadList from './upload/EpisodeUploadList';
import EpisodeUpload from './upload/EpisodeUpload';
import ArtistUpdate from './update/ArtistUpdate';
import MangaUpdate from './update/MangaUpdate';
import EpisodeUpdate from './update/EpisodeUpdate';
import Header from './Header';
import SignUp from './login/SignUp';
import SignIn from './login/SignIn';
import {LoginProvider} from './login/LoginProvider';

const Router = () => {
  return (
    <LoginProvider>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<MangaList/>} />

          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn/>}/>

          <Route path="/upload/artist/list" element={<ArtistUpload />} />
          <Route path="/upload/artist/:artistId" element= {<MangaUpload /> } />
          <Route path="/upload/manga/:mangaId" element={<EpisodeUploadList />} />
          <Route path="/upload/episode/:mangaId" element={<EpisodeUpload />} />

          <Route path="/view" element={<MangaList/>}/>
          <Route path="/view/manga/list" element={<MangaList />} />
          <Route path="/view/manga/:mangaId" element={<EpisodeList/>}/>
          <Route path="/view/episode/:episodeId" element={<Viewer />} />
          
          <Route path="/update/artist/:artistId" element={<ArtistUpdate />} />
          <Route path="/update/manga/:artistId/:mangaId" element={<MangaUpdate/>}/>
          <Route path="/update/episode/:mangaId/:episodeId" element={<EpisodeUpdate/>} />

        </Routes>
      </BrowserRouter>
    </LoginProvider>
  );
};

export default Router;