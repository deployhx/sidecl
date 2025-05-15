import axios from "axios";

const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  params: {
    maxResults: "20",
  },
  headers: {
    // "X-RapidAPI-Key": "dd562cb357msh45ab58d6f48fe43p1afc6ejsn030e672bab31", 
    "X-RapidAPI-Key": "7ef7a873e9msh555e4f1d65bbd1ap12e2a3jsn91c560ceb800", 
    // process.env.REACT_APP_YOUTUBE_API_KEY,
    // "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    // youtube-v311.p.rapidapi.com
    // "X-RapidAPI-Key": "933363cd4dmsh83c5d0b79e5cf1ap102133jsn268a612d8382",
  },
};

export const fetchFromAPI = async (url) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
  } catch (error) {
    console.log(error);
  }
};
