import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookListItem extends Component {
  render () {
    const { authors, title, backgroundImage } = this.props
    const style = {
      width: 128,
      height: 193,
      backgroundImage: `url("${backgroundImage}")`
    }

    return (
      <li>
        <div className='book'>
          <div className='book-top'>
            <div className='book-cover' style={style}></div>
            <div className='book-shelf-changer'>
              <select>
                <option value='none' disabled>Move to...</option>
                <option value='currentlyReading'>Currently Reading</option>
                <option value='wantToRead'>Want to Read</option>
                <option value='read'>Read</option>
                <option value='none'>None</option>
              </select>
            </div>
          </div>
          <div className='book-title'>{title}</div>
          <div className='book-authors'>{authors}</div>
        </div>
      </li>
    )
  }
}

BookListItem.propTypes = {
  authors: PropTypes.string,
  title: PropTypes.string,
  backgroundImage: PropTypes.string
}

export default BookListItem
