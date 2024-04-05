import axios from 'axios';

export const requestAccessToken = async (refreshToken) => {
  return await axios
    .post(`http://localhost:8080/token/refresh/`, {
      refreshToken: refreshToken,
    
    })
    .then((response) => {
      return response.data.access;
    })
    .catch((e) => {
      console.log(e.response.data);
    });
};
    
export const checkAccessToken = async (refreshToken) => {
  if (axios.defaults.headers.common["Authorization"] === undefined) {
    return await requestAccessToken(refreshToken).then((response) => {
      return response;
    });
  } else {
    return axios.defaults.headers.common["Authorization"].split(" ")[1];
  }
};

export const setAccessToken=()=>{
  const refreshToken=localStorage.getItem('refreshToken');
  const accessToken=localStorage.getItem('accessToken');
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${accessToken}`;
}