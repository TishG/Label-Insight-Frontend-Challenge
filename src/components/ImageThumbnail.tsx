import React from 'react';
import { IMAGE_MODAL } from '../consts';

interface Props {
  title: string;
  thumbnailUrl: string;
  url: string;
  handleClick: (title: string, url: string) => void;
}

const ImageThumbnail: React.FC<Props> = ({
  title,
  thumbnailUrl,
  url,
  handleClick,
}) => (
  <button
    onClick={() => handleClick(title, url)}
    type="button"
    className="btn col p-0 m-0"
    data-bs-toggle="modal"
    data-bs-target={`#${IMAGE_MODAL}`}
  >
    {thumbnailUrl ? (
      <img
        src={thumbnailUrl}
        className="img-thumbnail border p-0"
        alt={title || 'Title Unavailable'}
      />
    ) : (
      <div>Image Unavailable</div>
    )}
  </button>
);

export default ImageThumbnail;
