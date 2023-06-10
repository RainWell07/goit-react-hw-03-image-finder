import React from "react";
import PropTypes from 'prop-types';
import css from '../Modules/ImageFinder.module.css'

const ImageGalleryItem = ({imageUrl, onClick}) => {
    return (
        <li className={css.imageBorder}>
        <img className={css.imageContainer}  src={imageUrl} alt="" onClick={onClick} />
        </li>
    );
};

ImageGalleryItem.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;