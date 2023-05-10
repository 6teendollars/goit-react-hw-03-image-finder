import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import css from './ImageGallery.module.css';
import React, { Component } from 'react';

export class ImageGallery extends Component {
  state = {
    largeImage: '',
    title: '',
    isOpen: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.setState({
        isOpen: false,
      });
    }
  };

  handleClickImage = e => {
    this.setState({
      largeImage: e.target.dataset.image,
      title: e.target.alt,
      isOpen: true,
    });
  };

  handleClickBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.setState({
        isOpen: false,
      });
    }
  };

  render() {
    const { largeImage, title, isOpen } = this.state;
    return (
      <ul className={css.imageGallery}>
        {this.props.images.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              webFormat={webformatURL}
              largeFormat={largeImageURL}
              tags={tags}
              handleClick={this.handleClickImage}
            />
          );
        })}
        {isOpen && (
          <Modal
            largeImageURL={largeImage}
            title={title}
            onClick={this.handleClickBackdrop}
          />
        )}
      </ul>
    );
  }
}
