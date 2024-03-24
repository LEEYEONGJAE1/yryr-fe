import { Link } from "react-router-dom";

const Main = () => {
  return (
        <div>
            <Link to = "/manga/list">만화 보기</Link>

            <Link to ="/manga/upload">만화 업로드하기</Link>
        </div>
  );
};

export default Main;
