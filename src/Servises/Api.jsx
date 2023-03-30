import axios from 'axios';

export const fetchArticlesWithQuery = async (searchQuery, queryPage) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const searchParams = new URLSearchParams({
    key: `33300946-0122a5da3f7b887b7875e60e6`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  });

  const response = await axios.get(
    `${BASE_URL}?${searchParams}&q=${searchQuery}&page=${queryPage}`
  );
  return response.data.hits;
};