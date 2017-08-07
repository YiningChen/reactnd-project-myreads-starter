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

  isDuplicate (book, existingIDs) {
    if (existingIDs[book.id]) {
      return true
    }
    existingIDs[book.id] = true
    return false
  }

  // 1. dedupe results, when searching 'react' - results contain duplicates
  // 2. correct the shelf from app state
  getDedupedIds (results) {
    const existingIDs = {}
    const ids = []

    // check forEach b/c sometimes api returns object instead of array
    results.forEach && results.forEach(book => {
      if (!this.isDuplicate(book, existingIDs)) {
        ids.push(book.id)
      }
    })

    this.setState({searchResults: ids})
  }

  handleChange (event) {
    const search = event.target.value
    this.setState({search})

    if (!search) {
      this.setState({searchResults: []})
      return // don't call api with empty string to avoid 403 error
    }

    BooksAPI.search(search).then((results) => {
      // only update state if using latest search query
      if (search === this.state.search) {
        this.props.updateBooksWith(results)
        this.getDedupedIds(results)
      }
    })
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
          <BookOrderedList booksByID={this.props.booksByID} ids={this.state.searchResults} updateStateWithBooks={this.props.updateStateWithBooks} />
        </div>
      </div>
    )
  }
}

SearchBooks.propTypes = {
  booksByID: PropTypes.object,
  updateStateWithBooks: PropTypes.func
}

export default SearchBooks
