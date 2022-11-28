export const fetchPhotos = async (searchTerm) => {
    const header = {
      headers: { Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_TOKEN}` }
    }
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${searchTerm}`, header);
    const data = await response.json();
    return data.results;
  }