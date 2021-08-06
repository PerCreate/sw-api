import './App.css';
import React from 'react';
import { Request } from './components/Request';
import { People } from './components/People';
import { Loading } from './components/Loading'
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      url: 'https://swapi.dev/api/',
      itemsToRequset: [],
      peopleItems: [],
    }
  }

  componentDidMount () {
    const { url } = this.state;
    setTimeout(() => this.setState({isLoading: false}), 4500)
    fetch(url)
    .then((request) => request.json())
    .then((request) => {
      const list = Object.entries(request)
      this.setState({ itemsToRequset: list})
    })
    .catch((e) => e)
  }

  render() {
    const { isLoading, itemsToRequset, url } = this.state
    return !isLoading ?
    <Router>
      <Header />
      <Route exact path='/' component={() => <Request items={itemsToRequset} />} />
      <Route path='/people' component={() => <People url={url + 'people'} page='people'/>} />
      <Footer />
    </Router> : <Loading />
  }
}

export default App;
