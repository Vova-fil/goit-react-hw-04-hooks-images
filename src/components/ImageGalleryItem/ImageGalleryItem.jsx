import { useState } from 'react';
import PropTypes from 'prop-types';

import { ImageItem, ImageGalleryItemImage } from './ImageGalleryItem.styled.js';
import Modal from '../Modal';

export default function ImageGalleryItem({
  image: { webFormatURL, tags, largeImageURL },
}) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <ImageItem onClick={toggleModal}>
        <ImageGalleryItemImage src={webFormatURL} alt={tags} loading="lazy" />
      </ImageItem>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} loading="lazy" />
        </Modal>
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  webFormatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
