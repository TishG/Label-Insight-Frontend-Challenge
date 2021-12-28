import { useState, useEffect } from 'react';

import { DESCRIPTIONS } from '../consts';
import { fetchData, isSaved, getSaved, setSaved } from '../utils';

import Modal from './Modal';
import Jumbotron from './Jumbotron';
import FivebyFiveGrid from './FivebyFiveGrid';
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

  // compouted state
  const isLoading = !error && !isLoaded;
  const isError = error || (isLoaded && images.length === 0);
  const isSuccess = !error && isLoaded && images.length > 0;

  // Fetches photos from the API and then sets state, handles loading and error states
  const handleFetchImages = async () => {
    try {
      // Want to fetch everytime in case any 1 or more images from the API change
      // Another option could be to compare the saved photos from local storage with the ones from the API but that would amount to the same time complexity or more (if you also need to add the changed data to both local storage and state)
      const fetchedImages = await fetchData(
        'https://jsonplaceholder.typicode.com/photos',
      );

      setImages(fetchedImages);
      setIsLoaded(true);
    } catch (err) {
      setError(true);
      console.error(err.message);
    }
    return null;
  };

  // Fetches and handles the images, error, and loading state on inital render
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
    return null;
  };

  // shows the form when user clicks to edit or add a description
  const handleShowForm = () => {
    setTypedDescription(imageDescription);
    setShowForm(true);
    return null;
  };

  // Updates the modal description as the user types
  const handleChange = (e) => {
    setIsTyping(true);
    setTypedDescription(e.target.value);
    setIsTyping(false);
    return null;
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
    return null;
  };

  // Closes the form without saving
  const handleCancelForm = () => {
    setShowForm(false);
    return null;
  };

  return (
    <div className="App">
      <Jumbotron title="My Image Gallery" />

      {(isLoading && <Loading />) ||
        (isError && <Error />) ||
        (isSuccess && (
          <FivebyFiveGrid
            images={images}
            handleTileClick={handleTileClick}
          />
        ))}

      <Modal
        imageUrl={imageUrl}
        imageTitle={imageTitle}
        imageDescription={imageDescription}
        isTyping={isTyping}
        showForm={showForm}
        typedDescription={typedDescription}
        handleShowForm={handleShowForm}
        handleChange={handleChange}
        handleCancelForm={handleCancelForm}
        handleSave={handleSave}
      />
    </div>
  );
};

export default App;
