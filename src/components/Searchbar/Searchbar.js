import { Component } from 'react';
import { toast } from 'react-toastify';

import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
// import api from '../../services/imgAPI';
// import Button from 'components/Button/Button';
// import api from 'services/imgAPI';

export default class Searchbar extends Component {
  state = {
    query: '',
    page: 1,
    items: [],
  };

  // componentDidUpdate(_, prevState) {
  //   if (
  //     prevState.query !== this.state.query ||
  //     prevState.page !== this.state.page
  //   ) {
  //     api.fetchImg(this.state.page).then(pages =>this.setState({pages, page: this.loadMore,}))
  //     console.log('+1');
  //   }
  // }

  handleQueryChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      toast.info("Write the name of picture")
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({
      page: 1,
      query: event.target.elements.query.value,
      items: [],
    });
    event.target.reset();
  };

  render() {
    return (
      
        <header className={css.Searchbar}>
          <form className={css.SearchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={css.SearchForm_button} >
              <ImSearch className="button-label" />
            </button>
            <input
              className={css.SearchForm_input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              name="query"
              onChange={this.handleQueryChange}
            />
          </form>
        </header>      
    );
  }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}
