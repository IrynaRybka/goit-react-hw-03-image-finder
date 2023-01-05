import { Component } from 'react';
import { toast } from 'react-toastify';

import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    query: '',
    page: 1,
    hits: [],
  };

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
 
    // this.setState({
    //   query: event.target.elements.query.value,
    //   hits: [],
    //   page: 1,
    // });
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
              // value={this.state.query}
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
