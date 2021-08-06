import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Table } from './Table';


export class Character extends React.Component {
  static defaultProps = {
    url: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      starships: [],
      films: []
    }
  }

  componentDidMount () {
    const { url } = this.props
    fetch(url)
    .then((request) => request.json())
    .then((request) => {
      this.setState({ value: request})
      return request.starships
    })
    .then((ships) => ships.map((ship) => fetch(ship).then((data) => data.json()).then((data) => this.setState((prev) => ({ starships: [...prev.starships, data]})))))
    .catch((e) => e)
    fetch(url)
    .then((request) => request.json())
    .then((request) => request.films)
    .then((film) => film.map((film) => fetch(film).then((data) => data.json()).then((data) => this.setState((prev) => ({ films: [...prev.films, data]})))))
  }
  
  render() {
    const { name, birth_year, gender, height, mass, skin_color } = this.state.value
    const { starships, films } = this.state
    console.log(films)
    return (
      <React.Fragment>
        <div>{name}</div>
        <div>{birth_year}</div>
        <div>{gender}</div>
        <div>{height}</div>
        <div>{mass}</div>
        <div >{skin_color}</div>
        <div style={{color: 'red'}}>Ships:{starships.map((ship) => <div>{ship.name}</div>)}</div>
        <div style={{color: 'green'}}>Films:{films.map((film) => <div>{film.title}</div>)}</div>
        
      </React.Fragment>
    )
  }
}
