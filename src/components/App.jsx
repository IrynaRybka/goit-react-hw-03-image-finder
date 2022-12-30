import { Component } from 'react';
// import {ImSearch} from 'react-icons/im';
import {ToastContainer} from 'react-toastify';
// import ImgAPI from '../services/Images-api';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
// const KEY = '31302238-3bbf3bf14ed620b40113bc545';
export default class App extends Component {
  state = {
    query: "",
    images: null,
  };

  handleSubmitForm = (query) => {
    this.setState({query});
  }


  // componentDidMount() {
  //   fetch(
  //     'https://pixabay.com/api/?q=cat&page=1&key=31302238-3bbf3bf14ed620b40113bc545&image_type=photo&orientation=horizontal&per_page=12'
  //   )
  //     .then(res => res.json())
  //     .then(images => this.setState({ images }));
  // }

  render() {
   
    return (
      <div>
         <ToastContainer position="top-left" theme="colored"  />
        <Searchbar onSubmit={this.handleSubmitForm}/>
        <ImageGallery query={this.state.query}/>   
      </div>
    );
  }
}
