import React from 'react';

export class Species extends React.Component {
  static defaultProps = {
    url: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      people: [],
      films: []
    }
  }

  componentDidMount () {
    const { url } = this.props
    fetch(url) //get full data
    .then((request) => request.json())
    .then((request) => {
      this.setState({ value: request})
      return request.people
    })
    .then((people) => people.map((person) => fetch(person).then((data) => data.json()).then((data) => this.setState((prev) => ({ people: [...prev.people, data]}))))) // get starships
    .catch((e) => e)
    fetch(url)
    .then((request) => request.json())
    .then((request) => request.films)
    .then((film) => film.map((film) => fetch(film).then((data) => data.json()).then((data) => this.setState((prev) => ({ films: [...prev.films, data]}))))) //get films
  }
  
  render() {
    const { name, average_height, average_lifespan, classification, designation, homeworld } = this.state.value
    const { films, people } = this.state

    return (
      <React.Fragment>
        <div>Name: {name}</div>
        <div>Average height: {average_height}</div>
        <div>Average lifespan: {average_lifespan}</div>
        <div>Classification: {classification}</div>
        <div>Designation: {designation}</div>
        <div>Homeworld: {homeworld}</div>
        <div style={{color: 'red'}}>People:{people.length !== 0 ? people.map((person) => <div key={person.name}>{person.name}</div>) : ' empty'}</div>
        <div style={{color: 'green'}}>Films:{films.map((film) => <div key={film.title}>{film.title}</div>)}</div>
        
      </React.Fragment>
    )
  }
}
