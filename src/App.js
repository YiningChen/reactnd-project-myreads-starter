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
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  }

  organizeIntoShelves (data) {
    const shelves = {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }

    data.forEach(book => {
      const shelf = book.shelf
      shelves[shelf] && shelves[shelf].push(book)
    })

    return shelves
  }

  updateStateWithBooks () {
    BooksAPI.getAll().then((data) => {
      const shelves = this.organizeIntoShelves(data)
      this.setState(shelves)
    })
  }

  render () {
    console.warn(this.state)
    const boundUpdateState = this.updateStateWithBooks.bind(this)
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <ListBooks shelves={this.state} updateStateWithBooks={boundUpdateState} />
        )} />
        <Route path='/search' render={() => (
          <SearchBooks updateStateWithBooks={boundUpdateState} />
        )} />
      </div>
    )
  }

  componentDidMount () {
    this.updateStateWithBooks()
  }
}

export default BooksApp
