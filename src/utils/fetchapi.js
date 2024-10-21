import axios from "axios";

const base_url = "https://youtube-v31.p.rapidapi.com";

const options = {
  params: {
    maxResults: "50",
  },
  headers: {
    "X-RapidAPI-Key": "2feae43139msh91d8e953f8663a7p1aa1bcjsne33d5897f08b",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};
export const fetchapi = async (url) => {
  try {
    const response = await axios.get(`${base_url}/${url}`, options);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
