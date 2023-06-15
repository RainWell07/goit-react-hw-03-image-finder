import React, { Component } from 'react';
import Searchbar from '../components/mainComponents/Searchbar';
import ImageGallery from '../components/mainComponents/ImageGallery';
import Button from '../components/mainComponents/Button';
import Modal from '../components/mainComponents/Modal';
import { apiHelper } from '../components/API/ApiHelper';
import Loader from '../components/mainComponents/Loader';
import css from '../components/Modules/ImageFinder.module.css';
import Notiflix from 'notiflix';

class App extends Component {
  state = {
    query: '',
    page: 1,
    perPage: 12,
    images: [],
    isLoading: false,
    showModal: false,
    selectedImage: '',
    hasMoreImages: false,
  };

  handleSearch = (query) => {
    this.setState(
      {
        query,
        page: 1,
        images: [],
        hasMoreImages: false,
      },
    );
  };

  handleLoadMore = () => {
    const { query, page, perPage, hasNoMoreImages } = this.state;

    if (hasNoMoreImages) {
      return;
    }
    this.setState({ isLoading: true });

    apiHelper
      .searchImages(query, page + 1, perPage)
      .then((newImages) => {
        if (newImages.length > 0) {
          this.setState(
          (prevState) => ({
          images: [...prevState.images, ...newImages],
          page: prevState.page + 1,
          isLoading: false,
          shouldScrollToLoadMoreButton: true,
          }),
          () => {
          const scrollOffset = document.documentElement.scrollHeight - window.innerHeight;
          window.scrollTo({ top: scrollOffset, behavior: 'smooth' });
        }
        );
        } else {
          this.setState({ isLoading: false, hasNoMoreImages: true });
        }
      })
      .catch((error) => {
        console.error(error);
        this.setState({ isLoading: false });
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchImages();
    }
  }

  handleImageClick = (imageUrl) => {
    this.setState({ showModal: true, selectedImage: imageUrl });
    document.body.style.overflow = 'hidden';
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedImage: '' });
    document.body.style.overflow = 'auto';
  };

  fetchImages = () => {
    const { query, page, perPage } = this.state;
    this.setState({ isLoading: true });

    apiHelper
    .searchImages(query, page, perPage)
    .then((newImages) => {
      if (newImages.length > 0) {
        const hasMoreImages = newImages.length === perPage;
        this.setState((prevState) => ({
          images: [...prevState.images, ...newImages],
          isLoading: false,
          hasMoreImages,
        }));
      } else {
        this.setState({ isLoading: false, hasMoreImages: false });
        if (this.state.page === 1 && this.state.images.length === 0) {
          Notiflix.Notify.failure('Sorry, nothing was found for your search!');
        }
      }
    })
    .catch((error) => {
      console.error(error);
      this.setState({ isLoading: false });
    });
};

  render() {
    const { images, isLoading, showModal, selectedImage, hasMoreImages } = this.state;

    const showLoadMoreButton = images.length > 0 && !isLoading && hasMoreImages;

    return (
      <div className={css.container}>
        <Searchbar onSearch={this.handleSearch} />
        <ImageGallery images={images} onImageClick={this.handleImageClick}/>
        {isLoading && <Loader />}
        {showLoadMoreButton && <Button onClick={this.handleLoadMore}>Load More</Button>}
        {showModal && <Modal imageUrl={selectedImage} onClose={this.handleCloseModal} />}
      </div>
    );
  }
}

export default App;