import { IMAGE_MODAL } from '../consts';

const Image = ({ title, thumbnailUrl, url, handleClick }) => (
  <button
    onClick={() => handleClick(title, url)}
    type="button"
    className="btn p-0"
    data-bs-toggle="modal"
    data-bs-target={`#${IMAGE_MODAL}`}
  >
    {(thumbnailUrl && (
      <img
        src={thumbnailUrl}
        className="img-thumbnail border g-col"
        alt={title || 'Title Unavailable'}
      />
    )) || <div>Image Unavailable</div>}
  </button>
);

export default Image;
