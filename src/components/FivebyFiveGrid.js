import ImageThumbnail from './ImageThumbnail';

const FivebyFiveGrid = ({ images, handleTileClick }) => (
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
