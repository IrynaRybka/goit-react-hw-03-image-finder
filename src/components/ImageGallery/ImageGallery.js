import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import api from '../../services/imgAPI';
import css from './ImageGallery.module.css';

import MistakeImg from '../../images/mistake.jpg';


export default class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
    showModal: false,
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    if (prevQuery !== nextQuery) {
      console.log('изменился запрос');
      this.setState({ status: 'pending' });

      api
        .fetchImg(nextQuery)
        .then(images => this.setState({ images, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { images, error, status } = this.state;
    const { query } = this.props;

    if (status === 'idle') {
      return <div className={css.text_idle}>Напишите какие картинки вы хотите увидеть. Например "cat"</div>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <div>{error.message}</div>;
    }

    if (status === 'resolved' && images.hits.length !== 0) {
      return (
        <ul className={css.ImageGallery}>
          <ImageGalleryItem images={images} toggleModal={this.toggleModal} showModal={this.state.showModal}/>
        </ul>
      );
    } else {
      return (
        <div className={css.Error_Img}>
          <p>С названием {query} картинок нет. Попробуйте еще раз</p>
          <img src={MistakeImg} width="480" alt="Mistake" />
        </div>
      );
    }
  }
}
