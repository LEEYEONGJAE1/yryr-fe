import { Link } from "react-router-dom";

const Main = () => {
  return (
        <div>
            <h2><Link to = "/view">만화 보기</Link></h2>
            
            <h2><Link to ="/upload/artist/list">업로드하기</Link></h2>
        </div>
  );
};

export default Main;
