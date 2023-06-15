import axios from 'axios';

const API_KEY = '35883602-c1dbd6afe8bcf07d5100778d4';
const BASE_URL = 'https://pixabay.com/api/';

export const apiHelper = {
  searchImages: async (query, page, perPage) => {
    if (!query) {
      return [];
    }

    const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

    try {
      const response = await axios.get(url);
      return response.data.hits;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
