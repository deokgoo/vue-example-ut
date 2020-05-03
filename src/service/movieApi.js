import axios from 'axios';

const API_URL = 'https://movie-nodejs.herokuapp.com';

const sendApi = (method, url, token=null) => {
  return axios({
    headers: {
      Authorization: token?`Bearer ${token}`:"Basic ZGVvazpkZW9r"
    },
    method,
    url
  });
}

const getToken = async () => {
  const url = `${API_URL}/auth/login`;

  try {
    const res = await sendApi('POST', url);
    return res;
  }catch(e) {
    console.log(e);
  }
}

const getMovieRanking = async (token) => {
  const url = `${API_URL}/api/rank`;

  try {
    const res = await sendApi('GET', url, token);
    return res;
  }catch(err) {
    new Error(`movie api error: ${err}`)
  }
}

const getTokenAndMovidRanking = async () => {
  const tokenApi = await getToken();
  const token = tokenApi.data;
  
  return getMovieRanking(token);
}

export {
  getToken,
  getMovieRanking,
  getTokenAndMovidRanking,
}
