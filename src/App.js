import { Component } from 'react';
import './App.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import imagesApi from './services/imagesApi';
import Spinner from './components/Loader/Loader';
import Modal from './components/Modal';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoaded: false,
    error: null,
    showModal: false,
    LargeUrl: '',
    tag: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, images } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.fetchImages();
    }

    if (images.length > 12) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      images: [],
      currentPage: 1,
      error: null,
    });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = {
      searchQuery,
      currentPage,
    };

    this.setState({
      isLoaded: true,
    });

    imagesApi
      .fetchData(options)
      .then(hits =>
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          currentPage: prevState.currentPage + 1,
        })),
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoaded: false }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImageClick = e => {
    console.log('Кликнули по картинке');
    if (e.target.nodeName !== 'IMG') {
      return;
    }

    this.setState(
      {
        largeUrl: e.target.dataset.url,
        tags: e.target.alt,
      },
      () => console.log(this.state.tags),
    );

    this.toggleModal();
  };

  render() {
    const { isLoaded, images, showModal, largeUrl, tag } = this.state;

    const shouldRenderMoreButton = images.length > 0 && !isLoaded;

    return (
      <div className="container">
        <Searchbar onSubmit={this.onChangeQuery} />

        <ImageGallery images={images} onClick={this.onImageClick} />

        {isLoaded && <Spinner />}

        {shouldRenderMoreButton && <Button onClick={this.fetchImages} />}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeUrl} alt={tag} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
