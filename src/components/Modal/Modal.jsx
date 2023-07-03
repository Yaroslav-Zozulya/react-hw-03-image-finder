import { Component } from 'react';
import { Backdrop } from './Modal.styled';
import Gallery from 'react-image-gallery';
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.closeModal);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.closeModal);
  }
  render() {
    const { closeModal, galleryImages, id } = this.props;
    return (
      <Backdrop onClick={closeModal}>
        <Gallery
          items={galleryImages}
          showThumbnails={false}
          startIndex={Number(id)}
        />
      </Backdrop>
    );
  }
}
