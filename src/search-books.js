import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookOrderedList from './book-ordered-list-grid'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  constructor (props) {
    super(props)
    this.state = {
      search: '',
      searchResults: []
    }
  }

  handleChange (event) {
    const search = event.target.value
    this.setState({search})
    BooksAPI.search(search).then((results) => this.setState({searchResults: results}))
  }

  render () {
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link className='close-search' to='/'>Close</Link>
          <div className='search-books-input-wrapper'>
            <input type='text' onChange={this.handleChange.bind(this)} value={this.state.value} placeholder='Search by title or author' />
          </div>
        </div>
        <div className='search-books-results'>
          <BookOrderedList books={this.state.searchResults} updateStateWithBooks={this.props.updateStateWithBooks} />
        </div>
      </div>
    )
  }
}

SearchBooks.propTypes = {
  updateStateWithBooks: PropTypes.func
}

export default SearchBooks
