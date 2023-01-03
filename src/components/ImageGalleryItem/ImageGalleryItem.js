import Modal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';
import { IoCloseSharp } from 'react-icons/io5';
export default function ImageGalleryItem({ 
   webformatURL, largeImageURL, toggleModal, showModal }) {
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
  // return images.hits.map(({ id, webformatURL, largeImageURL }) => (
  //   <li className={css.ImageGalleryItem} key={id}>
  //     <img
  //       className={css.ImageGalleryItem_image}
  //       onClick={toggleModal}
  //       src={webformatURL}
  //       alt={id}
  //     />
  //     {showModal && (
  //       <Modal key={id} onClose={toggleModal}>
  //         <button type="button" onClick={toggleModal} className={css.close_btn}>
  //           <IoCloseSharp className={css.close_btn_icon}/>
  //         </button>
  //         <img className={css.largeImageURL} src={largeImageURL} alt="your query" />
  //       </Modal>
  //     )}
  //   </li>
  // ));
}
