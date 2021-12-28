import { useState, useEffect } from 'react';

import './App.css';

import Jumbotron from './Jumbotron';
import Loading from './Loading';
import Error from './Error';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [modal, setModal] = useState({
    title: '',
    src: '',
    description: '',
  });
  const [isTyping, setIsTyping] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchAndSetPhotos = async () => {
    try {
      if (localStorage.getItem('photos')) {
        console.log('getting from local sotrage');
        const photos = localStorage.getItem('photos');
        setPhotos(JSON.parse(photos));
      } else {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/photos',
        );
        const data = await response.json();
        const photos = await data.splice(0, 25);
        setPhotos(photos);
        localStorage.setItem('photos', JSON.stringify(photos));
      }
      setIsLoaded(true);
    } catch (err) {
      setError(true);
      console.error(err.message);
    }
  };

  const handleTileClick = (photo) => {
    const savedDescriptions = localStorage.getItem('descriptions');
    const descriptions =
      savedDescriptions && JSON.parse(savedDescriptions);
    const modalDescription = descriptions[photo.title] || '';

    const selectedPhoto = {
      title: photo.title,
      src: photo.url,
      description: modalDescription,
    };

    setModal(selectedPhoto);
    console.log(modalDescription);
  };

  useEffect(() => {
    fetchAndSetPhotos();
  }, []);

  const handleChange = (e) => {
    setIsTyping(true);
    setModal({ ...modal, description: e.target.value });
  };

  const handleSave = (e) => {
    const savedDescriptions = localStorage.getItem('descriptions');
    const descriptions =
      (savedDescriptions && JSON.parse(savedDescriptions)) || {};

    descriptions[modal.title] = modal.description;
    localStorage.setItem(
      'descriptions',
      JSON.stringify(descriptions),
    );
    setIsTyping(false);
    setShowForm(false);
  };

  const handleCancelForm = () => {
    setModal({ ...modal, description: '' });
    setShowForm(false);
  };
  console.log({ description: modal.description }, isTyping);
  return (
    <div className="App">
      <Jumbotron title="My Photo Gallery" />

      {(!error && !isLoaded && <Loading />) ||
        ((error || (isLoaded && photos.length === 0)) && <Error />) ||
        (!error && isLoaded && photos.length > 0 && (
          <div className="gallery container mt-5">
            <div className="grid">
              {photos.map((photo) => (
                <button
                  onClick={() => handleTileClick(photo)}
                  key={photo.title}
                  type="button"
                  className="btn p-0"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <img
                    src={photo?.thumbnailUrl}
                    className="img-thumbnail border g-col"
                    alt={photo.title}
                  />
                </button>
              ))}
            </div>
          </div>
        ))}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {modal.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <img
                src={modal.src}
                className="img-fluid"
                alt={modal.title}
              />
              {(modal.description && !isTyping && (
                <div className="description">{modal.description}</div>
              )) ||
                (!modal.description && !showForm && (
                  <button
                    type="button"
                    className="btn btn-primary mt-1"
                    onClick={() => setShowForm(true)}
                  >
                    Add a description
                  </button>
                )) ||
                (showForm && (
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Description
                    </label>
                    <textarea
                      onChange={(e) => handleChange(e)}
                      placeholder="At the Negril beach in Jamiaica with my family on a sunny, June day."
                      className="form-control mb-1"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn btn-danger mx-1"
                        onClick={() => handleCancelForm()}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={() => handleSave()}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
