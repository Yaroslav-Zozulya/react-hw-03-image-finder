import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isOpen: false,
    slideId: null,
  };

  openModal = e => {
    this.setState({ isOpen: true, slideId: e.target.dataset.id });
  };

  closeModal = e => {
    if (e.code === 'Escape' || e.target.nodeName === 'DIV') {
      this.setState({ isOpen: false });
    }
  };

  render() {
    const { previewURL, tags, images, id } = this.props;
    const { isOpen, slideId } = this.state;

    return (
      <>
        <li className="gallery-item">
          <img
            src={previewURL}
            alt={tags}
            onClick={this.openModal}
            data-id={id}
          />
        </li>
        {isOpen && (
          <Modal
            galleryImages={images}
            closeModal={this.closeModal}
            id={slideId}
          />
        )}
      </>
    );
  }
}
