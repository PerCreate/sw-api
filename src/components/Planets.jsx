import React from 'react';

export class Planets extends React.Component {
  static defaultProps = {
    url: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      residents: [],
      films: [],
      filterBy: '',
    }
  }

  filteringPlanets = () => {
    const { filterBy } = this.state
    switch(filterBy) {

    }
  }

  componentDidMount () {
    const { url } = this.props
    fetch(url) //get full data
    .then((request) => request.json())
    .then((request) => {
      this.setState({ value: request})
      return request.residents
    })
    .then((residents) => residents.map((resident) => fetch(resident).then((data) => data.json()).then((data) => this.setState((prev) => ({ residents: [...prev.residents, data]}))))) // get residents
    .catch((e) => e)
    fetch(url)
    .then((request) => request.json())
    .then((request) => request.films)
    .then((film) => film.map((film) => fetch(film).then((data) => data.json()).then((data) => this.setState((prev) => ({ films: [...prev.films, data]}))))) //get films
  }
  
  render() {
    const { name, climate, diameter, surface_water, population, terrain } = this.state.value
    const { residents, films } = this.state
    console.log(climate)
    return (
      <React.Fragment>
        <div>Name: {name}</div>
        <div>Climate: {climate}</div>
        <div>Diameter: {diameter}</div>
        <div>Surface water: {surface_water}</div>
        <div>Population: {population}</div>
        <div>Terrain: {terrain}</div>
        <div style={{color: 'red'}}>Residents:{residents.length !== 0 ? residents.map((ship) => <div>{ship.name}</div>) : ' empty'}</div>
        <div style={{color: 'green'}}>Films:{films.map((film) => <div>{film.title}</div>)}</div>
      </React.Fragment>
    )
  }
}
