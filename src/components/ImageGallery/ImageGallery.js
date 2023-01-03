import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import api from '../../services/imgAPI';
import css from './ImageGallery.module.css';
import Button from 'components/Button/Button';
import MistakeImg from '../../images/mistake.jpg';
// import Modal from 'components/Modal/Modal';

export default class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
    showModal: false,
    page: 1,
    hits: [],
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    if (prevQuery !== nextQuery || prevState.page !== this.state.page) {
      console.log('изменился запрос');
      this.setState({ status: 'pending' });
      // try {
      //   const images = api.fetchImg(nextQuery);
      //   this.setState({images, status:'resolved'})
      // } catch(error) {
      //   this.setState({error,  status: 'rejected'})
      // }

      api
        .fetchImg(nextQuery)
        .then(images => this.setState({ images, status: 'resolved'}))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }
  loadMore = () => {
      this.setState(prevState => ({
        page: prevState.page + 1,
      }));
    };


  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
 render() {
    const { images, error, status } = this.state;
    const { query } = this.props;

    if (status === 'idle') {
      return (
        <div className={css.text_idle}>
          <p>Напишите какие картинки вы хотите увидеть. Например "cat"</p>
        </div>
      );
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <div>{error.message}</div>;
    }

    if (status === 'resolved' && images.hits.length !== 0) {
      return (
        <div>
        <ul className={css.ImageGallery}>
         {images.hits.map(({id, webformatURL, largeImageURL}) => {
          return( 
        <ImageGalleryItem 
              key={id}
              // image={image}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              toggleModal={this.toggleModal}
              showModal={this.state.showModal}
            />
           ) 
         })}
                      
        </ul>
        <Button type='button' onClick={this.loadMore}>Load more</Button>
        </div>
    
      );
    } else {
      return (
        <div className={css.Error_Img}>
          <p>С названием {query} картинок нет. Попробуйте еще раз</p>
          <img src={MistakeImg} width="320" alt="Mistake" />
        </div>
      );
    }
  }
}
