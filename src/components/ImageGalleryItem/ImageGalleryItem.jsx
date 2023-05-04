export const ImageGalleryItem = ({ previewURL, tags }) => {
  return (
    <li className="gallery-item">
      <img src={previewURL} alt={tags} />
    </li>
  );
};
