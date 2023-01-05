import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
// import Modal from 'components/Modal/Modal';
// import { IoCloseSharp } from 'react-icons/io5';
export default class ImageGallery extends Component {
  state = {
     showModal: false,
    }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

 render() {
    const { hits } = this.props;
      return (
        <ul className={css.ImageGallery}>
         {hits.map(hit => (
        <ImageGalleryItem 
              key={hit.id}
              webformatURL={hit.webformatURL}
              toggleModal={this.toggleModal}
              showModal={this.state.showModal}
              largeImageURL={hit.largeImageURL}
            />
           ))}
         </ul>
      )
  }
}
