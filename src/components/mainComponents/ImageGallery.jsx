import React from "react";
import PropTypes from "prop-types";
import ImageGalleryItem from "./ImageGalleryItem";
import css from '../Modules/ImageFinder.module.css'

const ImageGallery = ({ images, onImageClick }) => {

  return (
    <div>
      <ul className={css.imageColumn}>
        {images.map((image) => (
        <ImageGalleryItem
        key={image.id}
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
  onLoadMore: PropTypes.func.isRequired,
};

export default ImageGallery;
