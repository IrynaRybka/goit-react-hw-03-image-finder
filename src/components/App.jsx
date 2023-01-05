import { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import { toast } from 'react-toastify';
import { api } from '../services/imgAPI';

// import MistakeImg from '../images/mistake.jpg';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';

export default class App extends Component {
  state = {
    query: '',
    hits: [],
    page: 1,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ status: 'pending' });
        const { hits } = await api(this.state.query, this.state.page);
        if (hits.length > 0) {
          return this.setState({
            status: 'resolved',
            hits: [...prevState.hits, ...hits],
            query: this.state.query,
          });
        }
        if (hits.length < 1) {
          this.setState({ status: 'idle' });
          toast.info('Нет таких картинок, попробуйте другое слово');
        }
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  }

  handleSubmitForm = query => {
    this.setState({ query, page: 1, hits:[] });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  // nextPage = async () => {
  //   this.setState({ status: 'pending' });
  // try {
  //   const { hits } = await api(this.state.query, this.state.page);
  //   this.setState(prevState => ({
  //     hits: [...prevState.hits, ...hits],
  //     status: 'resolved',
  //     page: this.state.page + 1,
  //   }));
  // } catch (error) {
  //   this.setState({ status: 'rejected' });
  // }
  // };

  render() {
    const { status, hits, page, query } = this.state;

    if (status === 'idle') {
      return (
        <div>
          <ToastContainer position="top-left" theme="colored" />
          <Searchbar onSubmit={this.handleSubmitForm}/>
          <div className={css.text_idle}>
            <p>Напишите какие картинки вы хотите увидеть. Например "cat"</p>
          </div>
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div>
          <Searchbar onSubmit={this.handleSubmitForm}/>
          <Loader />
          <ImageGallery query={query} page={page} hits={hits} />
          {page > 1 && (
            <Button type="button" onClick={this.loadMore}>
              Load more
            </Button>
          )}
        </div>
      );
    }
    if (status === 'rejected') {
      return (
        <div>
          <Searchbar onSubmit={this.handleSubmitForm}/>
          <p>Упс, что-то пошло не так. Попробуйте чуть позже</p>
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div>
          <Searchbar onSubmit={this.handleSubmitForm}/>
          <ImageGallery query={query} page={page} hits={hits} />
          {page > 0 && (
            <Button type="button" onClick={this.loadMore}>
              Load more
            </Button>
          )}
        </div>
      );
      // } else {
      //   return (
      //     <div>
      //       <Searchbar onSubmit={this.handleSubmitForm}/>
      //     <div className={css.Error_Img}>
      //       <p>С названием {query} картинок нет. Попробуйте еще раз</p>
      //       <img src={MistakeImg} width="320" alt="Mistake" />
      //     </div>
      //     </div>
      //   );
    }
  }
}
