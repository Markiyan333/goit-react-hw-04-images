import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    isModalShow: false,
  };

  toggleModal = () => {
    this.setState(({ isModalShow }) => ({ isModalShow: !isModalShow }));
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    const { isModalShow } = this.state;
    return (
      <li className={css.ImageGalleryItem} onClick={this.toggleModal}>
        <img
          src={webformatURL}
          alt={tags}
          className={css.ImageGalleryItem_image}
        />
        {isModalShow && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};