import { createPortal } from 'react-dom';
import { useEffect  } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');
export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const hendelKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', hendelKeyDown);

    return () => {
      window.removeEventListener('keydown', hendelKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className={css.Overlay}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};




Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};