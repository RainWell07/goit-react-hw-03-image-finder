import React from "react";
import PropTypes from "prop-types";
import ImageGalleryItem from "./ImageGalleryItem";
import css from '../Modules/ImageFinder.module.css'

const ImageGallery = ({ images, onImageClick }) => {

  return (
    <div>
      <ul className={css.imageColumn}>
      {images.map((image, index) => (
      <ImageGalleryItem
      key={`${image.id}_${index}`}
      imageUrl={image.webformatURL}
      onClick={() => onImageClick(image.largeImageURL)}
  />
))}
    </ul>
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
