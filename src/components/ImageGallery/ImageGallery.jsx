import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import { ImageGallery } from './ImageGallery.styled.js';

export default function PixabayImageGallery({ images }) {
  return (
    <div>
      <ImageGallery>
        {images.map(image => (
          <ImageGalleryItem key={image.id} image={image} />
        ))}
      </ImageGallery>
    </div>
  );
}
PixabayImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
