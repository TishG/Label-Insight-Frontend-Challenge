import React from 'react';
import ImageThumbnail from './ImageThumbnail';

type Image = {
  title: string;
  thumbnailUrl: string;
  url: string;
};

interface Props {
  images: Array<Image>;
  handleTileClick: (title: string, url: string) => void;
}

const FivebyFiveGrid: React.FC<Props> = ({
  images,
  handleTileClick,
}) => (
  <div
    className="FiveByFiveGrid my-5 mx-auto"
    style={{ maxWidth: '700px' }}
  >
    <div className="row row-cols-5">
      {images.map(({ title, thumbnailUrl, url }, index) => (
        <ImageThumbnail
          key={title || index}
          title={title}
          thumbnailUrl={thumbnailUrl}
          url={url}
          handleClick={handleTileClick}
        />
      ))}
    </div>
  </div>
);

export default FivebyFiveGrid;
