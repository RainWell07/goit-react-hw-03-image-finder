import axios from 'axios';

const API_KEY = '35883602-c1dbd6afe8bcf07d5100778d4';
const BASE_URL = 'https://pixabay.com/api/';

let abortController;

export const apiHelper = {
  searchImages: async (query, page, perPage) => {
    if (!query) {
      return [];
    }

    if (abortController) {
      abortController.abort();
    }

    abortController = new AbortController();
    const signal = abortController.signal;

    const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;
    const request = axios.get(url, { signal });

    try {
      const response = await request;
      return response.data.hits;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request was canceled', error.message);
      } else {
        console.error(error);
      }
      throw error;
    }
  },

  cancel: () => {
    if (abortController) {
      abortController.abort();
    }
  },
};
