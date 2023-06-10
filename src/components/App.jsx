import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Searchbar from '../components/mainComponents/Searchbar';
import ImageGallery from '../components/mainComponents/ImageGallery';
import Button from '../components/mainComponents/Button';
import Modal from '../components/mainComponents/Modal';
import { apiHelper } from '../components/API/ApiHelper';
import Loader from '../components/mainComponents/Loader';
import css from '../components/Modules/ImageFinder.module.css';
import Notiflix from 'notiflix';

class App extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      })
      ),
      };

state = {
    query: '',
    page: 1,
    perPage: 12,
    images: [],
    isLoading: false,
    showModal: false,
    selectedImage: '',
    hasNoMoreImages: false,
    shouldScrollToLoadMoreButton: false,
    };

  searchbarRef = React.createRef();

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.key === 'Escape') {
    this.handleCloseModal();
    }
  };

  handleSearch = (query) => {
    this.setState(
    { query, page: 1, images: [], hasNoMoreImages: false, shouldScrollToLoadMoreButton: false },
    this.fetchImages
    );
   };

  handleLoadMore = () => {
    const { query, page, perPage, hasNoMoreImages } = this.state;

    this.setState({ isLoading: true });

    if (hasNoMoreImages) {
      return;
    }

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
    () => {window.scrollTo({top: document.documentElement.scrollHeight,behavior: 'smooth',});
     }
    );
    } else {
        this.setState({ isLoading: false, hasNoMoreImages: true }, () => {
        Notiflix.Notify.warning('Sorry, There are no more images to load!');
        });
        }
      })
      .catch((error) => {
      console.error(error);
      this.setState({ isLoading: false });
      });
      };

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
        this.setState(
        (prevState) => ({
        images: [...prevState.images, ...newImages],
        isLoading: false,
        }),
        () => {
        if (this.state.images.length === 0) {
        this.searchbarRef.current.focusInput();
        Notiflix.Notify.failure('Sorry, nothing was found for your query!');
        }
        }
        );
      })
      .catch((error) => {
        console.error(error);
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { images, isLoading, showModal, selectedImage, hasNoMoreImages } = this.state;

    const showLoadMoreButton = images.length > 0 && !isLoading && !hasNoMoreImages;

    return (
      <div className={css.container}>
        <Searchbar onSearch={this.handleSearch} ref={this.searchbarRef} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} onLoadMore={this.handleLoadMore} />
        {isLoading && <Loader />}
        {showLoadMoreButton && <Button onClick={this.handleLoadMore}>Load More</Button>}
        {showModal && <Modal imageUrl={selectedImage} onClose={this.handleCloseModal} />}
      </div>
    );
  }
}

export default App;
