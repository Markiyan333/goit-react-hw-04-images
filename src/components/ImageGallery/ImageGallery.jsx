import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { fetchArticlesWithQuery } from 'Servises/Api';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  state = {
    searchimg: [],
    status: 'idel',
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchimg, page } = this.props;
    if (
      prevProps.searchimg !== searchimg ||
      (prevProps.searchimg === searchimg && prevProps.page !== page)
    ) {
      try {
        if (page === 1) {
          this.setState({ searchimg: [] });
        }
        this.setState({ status: 'pending' });

        const material = await fetchArticlesWithQuery(searchimg, page);
        this.setState(prevState => ({
          searchimg: [...prevState.searchimg, ...material],
          status: 'resolved',
        }));
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }

  render() {
    const { searchimg, status, error } = this.state;

    if (status === 'idel') {
      return;
    }
    if (status === 'pending') {
      return searchimg.length > 0 ? (
        <>
          <ul className={css.ImageGallery}>
            {searchimg.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
              />
            ))}
          </ul>
          <Loader />
        </>
      ) : (
        <Loader />
      );
    }
    if (status === 'rejected') {
      return <p>{error.message}</p>;
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className={css.ImageGallery}>
            {searchimg.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
              />
            ))}
          </ul>
          <Button incrementPage={this.props.incrementPage} />
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  page: PropTypes.number.isRequired,
  searchimg: PropTypes.string.isRequired,
  incrementPage: PropTypes.func.isRequired,
};