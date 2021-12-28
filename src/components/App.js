import { useState, useEffect } from 'react';

import './App.css';

import Jumbotron from './Jumbotron';
import Loading from './Loading';
import Error from './Error';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const fetchAndSetPhotos = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/photos',
      );
      const data = await response.json();
      const photos = await data.splice(0, 25);
      setPhotos(photos);
      setIsLoaded(true);
    } catch (err) {
      setError(true);
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchAndSetPhotos();
  }, []);

  return (
    <div className="App">
      <Jumbotron title="My Photo Gallery" />

      {(!error && !isLoaded && <Loading />) ||
        ((error || (isLoaded && photos.length === 0)) && <Error />) ||
        (!error && isLoaded && photos.length > 0 && (
          <div className="gallery container mt-5">
            <div className="grid">
              {photos.map((photo) => (
                <img
                  key={photo.title}
                  src={photo?.thumbnailUrl}
                  className="img-thumbnail border g-col"
                  alt={photo.title}
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default App;
