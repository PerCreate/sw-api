import React from 'react';

export class Character extends React.Component {
  static defaultProps = {
    url: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      starships: [],
      films: [],
      activeList: 'rockets',
      filmsState: 'unactive',
      rocketState: 'active'
    }
  }

  componentDidMount() {
    const { url } = this.props
    fetch(url) //get full data
      .then((request) => request.json())
      .then((request) => {
        this.setState({ value: request })
        return request.starships
      })
      .then((ships) => ships.map((ship) => fetch(ship).then((data) => data.json()).then((data) => this.setState((prev) => ({ starships: [...prev.starships, data] }))))) // get starships
      .catch((e) => e)
    fetch(url)
      .then((request) => request.json())
      .then((request) => request.films)
      .then((film) => film.map((film) => fetch(film).then((data) => data.json()).then((data) => this.setState((prev) => ({ films: [...prev.films, data] }))))) //get films
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
    const { name, birth_year, gender, height, mass, skin_color, edited, created } = this.state.value
    const { starships, films, rocketState, filmsState } = this.state
    //const createdData = moment([created])._d || null
    //const editedData = moment([edited])._d || null

    return (
      <React.Fragment>
        <h1>{name}</h1>
        <div className="icons-data">
          <div className='data'>
            <div className='img-container container'>
              <div className="img birth-year"></div>
            </div>
            <div className='date container'>
              {birth_year}
            </div>
          </div>
          <div className='data '>
            <div className='img-container container'>
              <div className="img gender"></div>
            </div>
            <div className='gender-data container'>
              {gender}
            </div>
          </div>
          <div className='data '>
            <div className='img-container container'>
              <div className="img height"></div>
            </div>
            <div className='height-data container'>
              {height}
            </div>
          </div>
          <div className='data '>
            <div className='img-container container'>
              <div className="img mass"></div>
            </div>
            <div className='mass-data container'>
              {mass} kg
            </div>
          </div>
          <div className='data '>
            <div className='img-container container'>
              <div className="img skin-color"></div>
            </div>
            <div className='skin-color-data container'>
              {skin_color}
            </div>
          </div>
        </div>

        <div className="lists">
          <div className="icon-lists">
            <div className={`img-container rockets ${rocketState}`} onClick={this.handleClickRockets}>
              <div className="rocket">
                <div className='img'></div>
              </div>
            </div>
            <div className={`img-container films ${filmsState}`} onClick={this.handleClickFilms}>
              <div className="film">
                <div className='img'></div>
              </div>
            </div>
          </div>
          
          <div className={`list-data ships ${rocketState}`}>{starships.length !== 0 ? starships.map((ship) => <div className='list-note' key={ship.name}>{ship.name}</div>) : 
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
