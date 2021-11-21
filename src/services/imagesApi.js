import axios from 'axios';

const apiKey = '24374609-133688d7da004cfa06346cc34';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const fetchData = async ({ searchQuery = '', currentPage = 1 }) => {
  const response = await axios.get(
    `/?q=${searchQuery}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  return response.data.hits.map(
    ({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }),
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { fetchData };
