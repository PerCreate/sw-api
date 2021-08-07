import './App.css';
import React from 'react';
import { List } from './components/List';
import { Sample } from './components/Sample';
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
      <Route exact path='/' component={() => <List items={itemsToRequset} />} />
      <Route path='/people' component={() => <Sample url={url + 'people'} page='people'/>} />
      <Route path='/planets' component={() => <Sample url={url + 'planets'} page='planets'/>} />
      <Route path='/films' component={() => <Sample url={url + 'films'} page='films'/>} />
      <Route path='/species' component={() => <Sample url={url + 'species'} page='species'/>} />
      <Route path='/vehicles' component={() => <Sample url={url + 'vehicles'} page='vehicles'/>} />
      <Route path='/starships' component={() => <Sample url={url + 'starships'} page='starships'/>} />
      <Footer />
    </Router> : <Loading />
  }
}

export default App;
