import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookListItem from './book-list-item'

class BookOrderedList extends Component {
  render () {
    return (
      <ol className='books-grid'>
        {this.props.books.map((book) =>
          <BookListItem
            key={book.id}
            id={book.id}
            currentShelf={book.shelf}
            updateStateWithBooks={this.props.updateStateWithBooks}
            authors={book.authors}
            title={book.title}
            backgroundImage={book.imageLinks && book.imageLinks.thumbnail}
          />
        )}
      </ol>
    )
  }
}

BookOrderedList.propTypes = {
  books: PropTypes.array,
  updateStateWithBooks: PropTypes.func
}

export default BookOrderedList
