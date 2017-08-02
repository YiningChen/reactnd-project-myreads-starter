import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookListItem from './book-list-item'

class BookOrderedList extends Component {
  render () {
    return (
      <ol className='books-grid'>
        {this.props.books.map((book) => <BookListItem
          authors={book.authors}
          title={book.title}
          backgroundImage={book.imageLinks.thumbnail}
        />)}
      </ol>
    )
  }
}

BookOrderedList.propTypes = {
  books: PropTypes.array
}

export default BookOrderedList
