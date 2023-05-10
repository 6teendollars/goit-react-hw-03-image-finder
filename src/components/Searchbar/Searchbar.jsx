import React, { Component } from 'react';
import Notiflix from 'notiflix';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  handleSubmit = evt => {
    evt.preventDefault();
    const query = evt.target.elements.searchInput.value.toLowerCase().trim();
    if (query) {
      this.props.onSubmit(query);
    } else {
      Notiflix.Notify.info('Please, enter your request');
    }
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.searchFormInput}
            name="searchInput"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
