import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookListItem from './book-list-item'

class BookOrderedList extends Component {
  render () {
    return (
      <ol className='books-grid'>
        {this.props.ids.map((id) => {
          const book = this.props.booksByID[id]
          return <BookListItem
            key={`${book.id}-${book.title}-${book.shelf}`}
            id={book.id}
            currentShelf={book.shelf}
            updateStateWithBooks={this.props.updateStateWithBooks}
            authors={book.authors}
            title={book.title}
            backgroundImage={book.imageLinks && book.imageLinks.thumbnail}
          />
        })}
      </ol>
    )
  }
}

BookOrderedList.propTypes = {
  booksByID: PropTypes.object,
  ids: PropTypes.array,
  updateStateWithBooks: PropTypes.func
}

export default BookOrderedList
