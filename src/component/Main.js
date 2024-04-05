import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "./login/LoginProvider";

const Main = () => {
  const {isLoggedIn,setIsLoggedIn}=useContext(LoginContext);
  return (
        <div>
            <h2><Link to = "/view">만화 보기</Link></h2>
            {isLoggedIn &&
            <h2><Link to ="/upload/artist/list">만화 업로드/수정하기</Link></h2>
            }
        </div>
  );
};

export default Main;
