import Modal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';
import { IoCloseSharp } from 'react-icons/io5';
export default function ImageGalleryItem({ 
   webformatURL, toggleModal, largeImageURL, showModal}) {
   
  return ( <div>
    <li className={css.ImageGalleryItem} >
      <img
        className={css.ImageGalleryItem_image}
        onClick={toggleModal}
        src={webformatURL}
        alt='img'
      />
    </li>
          {showModal && (
            <Modal onClose={toggleModal}>
              <button type="button" onClick={toggleModal} className={css.close_btn}>
                <IoCloseSharp className={css.close_btn_icon} />
              </button>
              <img
                className={css.largeImageURL}
                src={largeImageURL}
                alt="your query"
              />
            </Modal>
          )}
          </div>
  );

}
