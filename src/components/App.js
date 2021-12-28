import { useState, useEffect } from 'react';

import {
  DESCRIPTIONS,
  IMAGE_MODAL,
  DESCRIPTION_FORM_CONTROL,
} from '../consts';
import { fetchData, isSaved, getSaved, setSaved } from '../utils';

import './App.css';

import Image from './Image';
import Jumbotron from './Jumbotron';
import Loading from './Loading';
import Error from './Error';

const App = () => {
  const [images, setImages] = useState([]);
  const [modal, setModal] = useState({
    ImageTitle: '',
    imageUrl: '',
    imageDescription: '',
  });
  const [typedDescription, setTypedDescription] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // extracted state
  const { imageTitle, imageUrl, imageDescription } = modal;

  // Fetches photos from the API and then sets state, handles loading and error states
  const handleFetchImages = async () => {
    try {
      // Want to fetch everytime in case any 1 or more images from the API change
      // Another option would be to compare the saved photos from local storage with the one from the API but that would amount to the same time complexity or more (if you also need to add the changed data to both local storage and state)
      const fetchedImages = await fetchData(
        'https://jsonplaceholder.typicode.com/photos',
      );

      setImages(fetchedImages);
      setIsLoaded(true);
    } catch (err) {
      setError(true);
      console.error(err.message);
    }
  };

  useEffect(() => {
    handleFetchImages();
  }, []);

  // Opens the modal and sets the modal data
  const handleTileClick = (title, url) => {
    const imageDescriptions =
      isSaved(DESCRIPTIONS) && getSaved(DESCRIPTIONS);
    const description = imageDescriptions[title] || '';
    const selectedImage = {
      imageTitle: title,
      imageUrl: url,
      imageDescription: description,
    };

    setModal(selectedImage);
  };

  // shows the form when user clicks to edit or add a description
  const handleShowForm = () => {
    setTypedDescription(imageDescription);
    setShowForm(true);
  };

  // Updates the modal description as the user types
  const handleChange = (e) => {
    setIsTyping(true);
    setTypedDescription(e.target.value);
    setIsTyping(false);
  };

  // Adds the description to the descriptions object in local storage or
  // Creates a descriptions object and saves to localStorage
  // Closes the form when done
  const handleSave = () => {
    const { imageTitle } = modal;
    const descriptions = isSaved(DESCRIPTIONS)
      ? getSaved(DESCRIPTIONS)
      : {};
    descriptions[imageTitle] = typedDescription;
    setModal({ ...modal, imageDescription: typedDescription });
    setSaved(DESCRIPTIONS, descriptions);
    setIsTyping(false);
    setShowForm(false);
  };

  // Closes the form without saving
  const handleCancelForm = () => {
    setShowForm(false);
    return false;
  };

  return (
    <div className="App">
      <Jumbotron title="My Image Gallery" />

      {/* image grid */}
      {(!error && !isLoaded && <Loading />) ||
        ((error || (isLoaded && images.length === 0)) && <Error />) ||
        (!error && isLoaded && images.length > 0 && (
          <div className="gallery container mt-5">
            <div className="grid">
              {images.map(({ title, thumbnailUrl, url }, index) => (
                <Image
                  key={title || index}
                  title={title}
                  thumbnailUrl={thumbnailUrl}
                  url={url}
                  handleClick={handleTileClick}
                />
              ))}
            </div>
          </div>
        ))}

      <div
        className="modal fade"
        id={IMAGE_MODAL}
        tabIndex="-1"
        aria-labelledby="imageModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{imageTitle}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <img
                src={imageUrl}
                className="img-fluid"
                alt={imageTitle}
              />
              {(imageDescription && !isTyping && !showForm && (
                <div className="description">
                  <div>{imageDescription}</div>
                  <button
                    type="button"
                    className="btn btn-primary mt-1"
                    onClick={() => handleShowForm()}
                  >
                    Edit description
                  </button>
                </div>
              )) ||
                (!imageDescription && !showForm && (
                  <button
                    type="button"
                    className="btn btn-primary mt-1"
                    onClick={() => handleShowForm()}
                  >
                    Add a description
                  </button>
                )) ||
                (showForm && (
                  <div className="mb-3">
                    <label
                      htmlFor={DESCRIPTION_FORM_CONTROL}
                      className="form-label"
                    >
                      Description
                    </label>
                    <textarea
                      onChange={(e) => handleChange(e)}
                      placeholder="Relaxing on the beach with purple sunglasses on. It's a sunny, june day."
                      className="form-control mb-1"
                      id={DESCRIPTION_FORM_CONTROL}
                      rows="3"
                      value={typedDescription || null}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
