import Modal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';
export default function ImageGalleryItem({ images, toggleModal, showModal }) {
  return images.hits.map(({ id, webformatURL, largeImageURL }) => (
    <li className={css.ImageGalleryItem} key={id}>
      <img
        className={css.ImageGalleryItem_image}
        onClick={toggleModal}
        src={webformatURL}
        alt={id}
      />

      {showModal && (
        <Modal onClose={toggleModal}>
          <button type="button" onClick={toggleModal}>
            Close
          </button>
          <img className={css.largeImageURL} src={largeImageURL} alt={id} />
        </Modal>
      )}
    </li>
  ));
}
