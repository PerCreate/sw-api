import React from 'react';

export class Starships extends React.Component {
  static defaultProps = {
    url: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      pilots: [],
      films: [],
    }
  }

  componentDidMount () {
    let { url } = this.props
    fetch(url) //get full data
    .then((request) => request.json())
    .then((request) => {
      this.setState({ value: request})
      return request.pilots
    })
    .then((pilots) => pilots.map((pilot) => fetch(pilot).then((data) => data.json()).then((data) => this.setState((prev) => ({ pilots: [...prev.pilots, data]})))))
    .catch((e) => e)
    fetch(url)
    .then((request) => request.json())
    .then((request) => request.films)
    .then((films) => films.map((film) => fetch(film).then((data) => data.json()).then((data) => this.setState((prev) => ({ films: [...prev.films, data]}))))) //get films
  }
  
  render() {
    const { name, model, max_atmosphering_speed, length, cost_in_credits } = this.state.value
    const { pilots, films } = this.state

    return (
      <React.Fragment>
        <div>Name: {name}</div>
        <div>Model: {model}</div>
        <div>Max atmosphering speed: {max_atmosphering_speed}</div>
        <div>Length crawl: {length}</div>
        <div>Cost in credits: {cost_in_credits}</div>
        <div style={{color: 'red'}}>Pilots:{pilots.length !== 0 ? pilots.map((pilot) => <div key={pilot.name}>{pilot.name}</div>) : ' empty'}</div>
        <div style={{color: 'green'}}>Films:{films.map((film) => <div key={film.title}>{film.title}</div>)}</div>
      </React.Fragment>
    )
  }
}
