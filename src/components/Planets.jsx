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
      activeList: 'rockets',
      filmsState: 'unactive',
      rocketState: 'active'
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

  handleClickRockets = (e) => {
    const { activeList } = this.state
    activeList === 'rockets' ? this.setState({ activeList: 'rockets'}) : this.setState({ activeList: 'rockets', filmsState: 'unactive', rocketState: 'active'})
  }
  
  handleClickFilms = (e) => {
    const { activeList } = this.state
    activeList === 'films' ? this.setState({ activeList: 'films'}) : this.setState({ activeList: 'films', filmsState: 'active', rocketState: 'unactive'})
  }
  
  render() {
    const { name, climate, diameter, surface_water, population, terrain } = this.state.value
    let { residents, films, rocketState, filmsState } = this.state

    return climate === undefined ? <></> : (
      <React.Fragment>
        <h1>{name}</h1>
        <div className="icons-data">
          <div className='data'>
            <div className='img-container container'>
              <div className='text-description'>Climate</div>
            </div>
            <div className='date container'>
              {climate.split(' ')[0].replace(',', '')}
            </div>
          </div>
          <div className='data '>
            <div className='img-container container'>
              <div className='text-description'>diameter</div>
            </div>
            <div className='gender-data container'>
              {diameter}
            </div>
          </div>
          <div className='data '>
            <div className='img-container container'>
              <div className='text-description'>Surface</div>
            </div>
            <div className='height-data container'>
              {surface_water == 1 ? 'water' : 'no water'}
            </div>
          </div>
          <div className='data '>
            <div className='img-container container'>
              <div className='text-description'>Population</div>
            </div>
            <div className='mass-data container'>
              {population}
            </div>
          </div>
          <div className='data '>
            <div className='img-container container'>
              <div className='text-description'>Terrain</div>
            </div>
            <div className='skin-color-data container'>
              {terrain.split(' ')[0].replace(',', '')}
            </div>
          </div>
        </div>

        <div className="lists">
          <div className="icon-lists">
            <div className={`img-container rockets ${rocketState}`} onClick={this.handleClickRockets}>
              <div>
                Residents
              </div>
            </div>
            <div className={`img-container films ${filmsState}`} onClick={this.handleClickFilms}>
              <div className="film">
                <div className='img'></div>
              </div>
            </div>
          </div>
          
          <div className={`list-data ships ${rocketState}`}>{residents.length !== 0 ? residents.map((resident) => <div className='list-note' key={resident.name}>{resident.name}</div>) : 
            <div className='list-note'>
              None
            </div>}
          </div>
          <div className={`list-data films ${filmsState}`}>{films.map((film) => <div  className='list-note' key={film.title}>{film.title}</div>)}</div>
        </div>
      </React.Fragment>
    )
  }
}
