import React from "react";
import PropTypes from 'prop-types';
import css from '../Modules/ImageFinder.module.css'

const Button = ({onClick, children}) => {
    return <button className = {css.loadButton} onClick={onClick}>{children}</button>
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Button;