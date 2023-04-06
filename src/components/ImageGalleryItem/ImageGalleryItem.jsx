import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [isModalShow, setisModalShow] = useState(false);

  const toogleModal = () => {
  setisModalShow(prevState => !prevState);
  };

  return (
    <li className={css.ImageGalleryItem} onClick={toogleModal}>
      <img
        src={webformatURL}
        alt={tags}
        className={css.ImageGalleryItem_image}
      />
      {isModalShow && (
        <Modal onClose={toogleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  searchimg: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};