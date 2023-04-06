import { useState, useEffect } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { fetchArticlesWithQuery } from 'Servises/Api';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ incrementPage, newsearchimg, page }) => {
  const [searchimg, setSearchimg] = useState([]);
  const [status, setStatus] = useState('idel');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (newsearchimg === '') {
      return;
    }

    if (page === 1) {
      setSearchimg([]);
    }
    setStatus('pending');

    fetchArticlesWithQuery(newsearchimg, page)
      .then(material => {
        setSearchimg(prevState => [...prevState, ...material]);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [newsearchimg, page]);

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
        <Button incrementPage={incrementPage} />
      </>
    );
  }
};

ImageGallery.propTypes = {
  page: PropTypes.number.isRequired,
  newsearchimg: PropTypes.string.isRequired,
  incrementPage: PropTypes.func.isRequired,
};