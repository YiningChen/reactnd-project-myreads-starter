import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './list-books'
import SearchBooks from './search-books'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    console.warn(this.state)
    return (
      <div className='app'>
        <Route exact path='/' component={ListBooks} />
        <Route path='/search' component={SearchBooks} />
      </div>
    )
  }

  componentDidMount () {
    BooksAPI.getAll().then(data => this.setState(data))
  }
}

export default BooksApp
