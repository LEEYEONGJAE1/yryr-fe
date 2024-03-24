import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Viewer from './Viewer';
import MangaList from './MangaList';
import EpisodeList from './EpisodeList';
import Main  from './Main';
import Upload from './Upload';

const Router = () => {
    return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/manga/upload" element={<Upload />} />
            <Route path="/manga/list" element={<MangaList />} />
            <Route path="/manga/:mangaId" element={<EpisodeList/>}/>
            <Route path="/episode/:episodeId" element={<Viewer />} />
          </Routes>
      </BrowserRouter>
    );
  };

  export default Router;