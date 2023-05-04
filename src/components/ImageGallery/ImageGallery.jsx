import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <ul>
      {images.map(({ id, previewURL, tags }) => (
        <ImageGalleryItem key={id} previewURL={previewURL} tags={tags} />
      ))}
    </ul>
  );
};
