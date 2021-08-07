import React from 'react';
import moment from 'moment';
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
    fetch(url) //get full data
    .then((request) => request.json())
    .then((request) => {
      this.setState({ value: request})
      return request.starships
    })
    .then((ships) => ships.map((ship) => fetch(ship).then((data) => data.json()).then((data) => this.setState((prev) => ({ starships: [...prev.starships, data]}))))) // get starships
    .catch((e) => e)
    fetch(url)
    .then((request) => request.json())
    .then((request) => request.films)
    .then((film) => film.map((film) => fetch(film).then((data) => data.json()).then((data) => this.setState((prev) => ({ films: [...prev.films, data]}))))) //get films
  }
  
  render() {
    const { name, birth_year, gender, height, mass, skin_color, edited, created } = this.state.value
    const { starships, films } = this.state
    const createdData = moment([created])._d || null
    const editedData = moment([edited])._d || null
    console.log(moment([created])._d, edited)
    return (
      <React.Fragment>
        <div>Name: {name}</div>
        <div>Birth_year: {birth_year}</div>
        <div>Gender: {gender}</div>
        <div>Height: {height}</div>
        <div>Mass: {mass}</div>
        <div>Created: {createdData.toString()}</div>
        <div>Edited: {editedData.toString()}</div>
        <div>Skin color: {skin_color}</div>
        <div style={{color: 'red'}}>Ships:{starships.length !== 0 ? starships.map((ship) => <div key={ship.name}>{ship.name}</div>) : ' empty'}</div>
        <div style={{color: 'green'}}>Films:{films.map((film) => <div key={film.title}>{film.title}</div>)}</div>
        
      </React.Fragment>
    )
  }
}
