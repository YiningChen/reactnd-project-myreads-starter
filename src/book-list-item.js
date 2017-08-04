import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class BookListItem extends Component {
  handleOnChange (event) {
    const newShelf = event.target.value
    const currentShelf = this.props.currentShelf
    if (newShelf && newShelf !== currentShelf) {
      BooksAPI.update({id: this.props.id}, newShelf)
        .then(this.props.updateStateWithBooks)
    }
  }

  render () {
    const { currentShelf, authors, title, backgroundImage } = this.props
    const style = {
      width: 128,
      height: 193,
      backgroundImage: `url("${backgroundImage}")`
    }

    return (
      <li>
        <div className='book'>
          <div className='book-top'>
            <div className='book-cover' style={style} />
            <div className='book-shelf-changer'>
              <select value={currentShelf} onChange={this.handleOnChange.bind(this)}>
                <option value='none' disabled>Move to...</option>
                <option value='currentlyReading'>Currently Reading</option>
                <option value='wantToRead'>Want to Read</option>
                <option value='read'>Read</option>
                <option value='none'>None</option>
              </select>
            </div>
          </div>
          <div className='book-title'>{title}</div>
          <div className='book-authors'>{authors.join(', ')}</div>
        </div>
      </li>
    )
  }
}

BookListItem.propTypes = {
  id: PropTypes.string,
  currentShelf: PropTypes.string,
  updateStateWithBooks: PropTypes.func,
  authors: PropTypes.string,
  title: PropTypes.string,
  backgroundImage: PropTypes.string
}

export default BookListItem
