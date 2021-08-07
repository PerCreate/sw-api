import React from 'react';

export class Films extends React.Component {
  static defaultProps = {
    url: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      characters: [],
      planets: []
    }
  }

  componentDidMount () {
    const { url } = this.props
    fetch(url) //get full data
    .then((request) => request.json())
    .then((request) => {
      this.setState({ value: request})
      return request.characters
    })
    .then((characters) => characters.map((character) => fetch(character).then((data) => data.json()).then((data) => this.setState((prev) => ({ characters: [...prev.characters, data]})))))
    .catch((e) => e)
    fetch(url)
    .then((request) => request.json())
    .then((request) => request.planets)
    .then((planets) => planets.map((planet) => fetch(planet).then((data) => data.json()).then((data) => this.setState((prev) => ({ planets: [...prev.planets, data]}))))) //get films
  }
  
  render() {
    const { title, director, episode_id, opening_crawl, producer } = this.state.value
    const { characters, planets } = this.state

    return (
      <React.Fragment>
        <div>Title: {title}</div>
        <div>Director: {director}</div>
        <div>Episode: {episode_id}</div>
        <div>Opening crawl: {opening_crawl}</div>
        <div>Producer: {producer}</div>
        <div style={{color: 'red'}}>Characters:{characters.length !== 0 ? characters.map((ship) => <div key={ship.name}>{ship.name}</div>) : ' empty'}</div>
        <div style={{color: 'green'}}>Planets:{planets.map((planet) => <div key={planet.name}>{planet.name}</div>)}</div>
      </React.Fragment>
    )
  }
}
