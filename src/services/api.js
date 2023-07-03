import axios from 'axios';

const API_KEY = '26638339-3b1376c53457034de3b242118';

axios.defaults.baseURL = `https://pixabay.com/api`;

const fetchImages = async (q, page = 1) => {
  try {
    const response = await axios.get(`/`, {
      params: {
        q,
        page,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    });
    if (response.data.hits.length === 0) {
      throw new Error("We can't find any images. Try another query 🙄");
    }
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

const api = {
  fetchImages,
};

export default api;
