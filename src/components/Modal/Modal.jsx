import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaRegWindowClose } from "react-icons/fa";
import { useAuth } from '../../hooks/useAuth'
import styles from './Modal.module.css';
import Loader from '../Loader/Loader';

function Modal({ closeModal, children, style }) {
  const {isLoading} = useAuth()
  
  useEffect(() => {
    const onEscClick = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', onEscClick);
    return () => {
      window.removeEventListener('keydown', onEscClick);
    };
  }, [closeModal]);

  const onOverlayClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
  return isLoading ?
  (<Loader />)
  :
  createPortal(
    <div className={styles.backdrop} onClick={onOverlayClick}>
      <div className={style || styles.modal}>
        <button className={styles.closeButton} onClick={closeModal}>
          <FaRegWindowClose size="25px"/>
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default Modal;
