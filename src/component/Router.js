import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Viewer from './service/Viewer';
import MangaList from './list/MangaList';
import EpisodeList from './list/EpisodeList';
import Main  from './Main';
import ArtistUpload from './service/ArtistUpload';
import MangaUpload from './service/MangaUpload';
import EpisodeUploadList from './service/EpisodeUploadList';
import EpisodeUpload from './service/EpisodeUpload';
import Header from './Header';

const Router = () => {
    return (
      <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Main />} />

            <Route path="/view" element={<MangaList/>}/>
            <Route path="/view/manga/list" element={<MangaList />} />
            <Route path="/view/manga/:mangaId" element={<EpisodeList/>}/>
            <Route path="/view/episode/:episodeId" element={<Viewer />} />
            
            <Route path="/upload/artist/list" element={<ArtistUpload />} />
            <Route path="/upload/artist/:artistId" element= {<MangaUpload /> } />
            <Route path="/upload/manga/:mangaId" element={<EpisodeUploadList />} />
            <Route path="/upload/episode/:mangaId" element={<EpisodeUpload />} />
            
          </Routes>
      </BrowserRouter>
    );
  };

  export default Router;