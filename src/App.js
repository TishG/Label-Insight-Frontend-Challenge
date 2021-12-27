import { useState, useEffect } from 'react';

import './App.css';

import Jumbotron from './Jumbotron';

const App = () => {
  const [photos, setPhotos] = useState([]);

  const fetchAndSetPhotos = () => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((data) => {
        const photos = data.splice(0, 25);
        setPhotos(photos);
      });
  };

  useEffect(() => {
    fetchAndSetPhotos();
  }, []);

  return (
    <div className="App">
      <Jumbotron title="My Photo Gallery" />
      <div className="container gallery">
        <div className="grid">
          {photos.length ? (
            photos.map((photo) => (
              <img
                key={photo.title}
                src={photo?.thumbnailUrl}
                className="img-thumbnail border g-col"
                alt={photo.title}
              />
            ))
          ) : (
            <div className="container">
              <div class="spinner-grow text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
