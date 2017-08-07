import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './list-books'
import SearchBooks from './search-books'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      booksByID: {},
      shelves: {
        currentlyReading: [],
        wantToRead: [],
        read: []
      }
    }
  }

  updateBooksWith (data, overwrite) {
    this.setState(state => {
      const booksByID = state.booksByID
      data.forEach(book => {
        if (overwrite || !booksByID[book.id]) booksByID[book.id] = book
      })
      return { booksByID }
    })
  }

  updateShelves (data) {
    const shelves = {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }

    data.forEach(book => {
      const shelf = book.shelf
      shelves[shelf] && shelves[shelf].push(book.id)
    })

    this.setState({ shelves })
  }

  updateStateWithBooks () {
    BooksAPI.getAll().then((data) => {
      this.updateBooksWith(data, true)
      this.updateShelves(data)
    })
  }

  render () {
    const boundUpdateState = this.updateStateWithBooks.bind(this)
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <ListBooks
            booksByID={this.state.booksByID}
            shelves={this.state.shelves}
            updateStateWithBooks={boundUpdateState} />
        )} />
        <Route path='/search' render={() => (
          <SearchBooks
            booksByID={this.state.booksByID}
            updateBooksWith={this.updateBooksWith.bind(this)}
            updateStateWithBooks={boundUpdateState} />
        )} />
      </div>
    )
  }

  componentDidMount () {
    BooksAPI.getAll().then((data) => {
      this.updateBooksWith(data)
      this.updateShelves(data)
    })
  }
}

export default BooksApp
