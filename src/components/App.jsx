import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import * as Scroll from 'react-scroll';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

const scroll = Scroll.animateScroll;

const API_KEY = '34653415-e76f837a15d16f03129de4a6a';
const BASE_URL = 'https://pixabay.com/api/?';
const searchParams = 'image_type=photo&orientation=horizontal&per_page=12';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    isLoading: false,
  };

  handleSubmit = async query => {
    if (query === this.state.searchQuery) {
      return;
    }
    const searchUrl = `${BASE_URL}q=${query}&page=1&key=${API_KEY}&${searchParams}`;
    try {
      this.setState({ isLoading: true });
      scroll.scrollToTop();
      const response = await axios.get(searchUrl);
      if (response.data.hits.length === 0) {
        Notiflix.Notify.info('Images not found. Please change your request');
        return;
      }
      this.setState({
        searchQuery: query,
        images: response.data.hits,
        page: 1,
      });
    } catch (error) {
      Notiflix.Notify.failure('Something went wrong, try again.');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleClick = async () => {
    const { searchQuery, page } = this.state;
    const searchUrl = `${BASE_URL}q=${searchQuery}&page=${
      page + 1
    }&key=${API_KEY}&${searchParams}`;
    try {
      this.setState({ isLoading: true });
      const response = await axios.get(searchUrl);
      scroll.scrollMore(500);
      if (response.data.hits.length === 0) {
        Notiflix.Notify.info('The images of your request is over');
        return;
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...response.data.hits],
        page: prevState.page + 1,
      }));
    } catch (error) {
      Notiflix.Notify.failure('Something went wrong, try again.');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { isLoading, images } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {isLoading && <Loader />}
        <ImageGallery images={images} />
        {images.length !== 0 && <Button handleClick={this.handleClick} />}
      </>
    );
  }
}
