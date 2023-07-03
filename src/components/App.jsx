import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Layout } from './Layout/Layout';
import { ImageGallery } from './ImageGallery/ImageGallery';
import api from 'services/api';
import { Button } from './Button/Button';
import { HashLoader } from 'react-spinners';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    query: '',
    page: 0,
    totalPages: 0,
    images: [],
    isLoading: false,
    searchId: null,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page, searchId } = this.state;

    if (
      prevState.page !== page ||
      prevState.query !== query ||
      prevState.searchId !== searchId
    ) {
      try {
        this.setState({ isLoading: true });
        const response = await api.fetchImages(query, page);
        this.setState({ isLoading: false });

        if (!response) {
          return;
        }
        this.setState(prevState => {
          return {
            images: [
              ...prevState.images,
              ...this.createGalleryImagesData(response.hits),
            ],
          };
        });
        if (page === 1) {
          this.calcTotalPages(response);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  createGalleryImagesData = images => {
    return images.map(({ id, previewURL, largeImageURL, tags }) => {
      return {
        id,
        original: largeImageURL,
        thumbnail: previewURL,
        tags,
      };
    });
  };

  searchbarHandleSubmit = async e => {
    e.preventDefault();
    const searchQuery = e.currentTarget.elements.input.value.trim();

    if (searchQuery) {
      this.setState({
        query: searchQuery,
        page: 1,
        images: [],
        searchId: nanoid(),
      });
    }
  };

  calcTotalPages = ({ totalHits }) => {
    const totalPages = Math.ceil(totalHits / 12);
    this.setState({ totalPages });
  };

  loadMoreHandleClick = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { images, totalPages, page, isLoading } = this.state;
    const isImages = images.length !== 0;
    const isMorePage = totalPages > page;

    return (
      <Layout>
        <Searchbar onSubmit={this.searchbarHandleSubmit} />
        {isLoading && <HashLoader color="#36d7b7" />}
        {isImages && <ImageGallery images={images} />}

        {isMorePage && (
          <Button loadMoreHandleClick={this.loadMoreHandleClick} />
        )}
      </Layout>
    );
  }
}
