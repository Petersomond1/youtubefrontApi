

// const BASE_URL = "https://youtube-v31.p.rapidapi.com";

import axios from "axios";

const options = {
  method: "GET",

  params: {
    maxResults: "50",
  },

  headers: {
    "X-RapidAPI-Key": "eaf54a6583msh168339a792b7460p16e58fjsn309b077e0b30",

    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};
