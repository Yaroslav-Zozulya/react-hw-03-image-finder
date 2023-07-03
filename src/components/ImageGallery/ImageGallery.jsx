import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, galleryImages }) => {
  return (
    <ul>
      {images.map(({ id, thumbnail, tags }, idx) => (
        <ImageGalleryItem
          key={id}
          id={idx}
          previewURL={thumbnail}
          tags={tags}
          images={images}
        />
      ))}
    </ul>
  );
};
