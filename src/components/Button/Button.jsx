import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

export function Button({ handleClick }) {
  return (
    <button type="button" className={css.button} onClick={handleClick}>
      Load more
    </button>
  );
}

Button.propTypes = {
  handleClick: PropTypes.func,
};
