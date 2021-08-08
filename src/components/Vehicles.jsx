import React from 'react';

export class Vehicles extends React.Component {
  static defaultProps = {
    url: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      pilots: [],
      films: [],
      activeList: 'rockets',
      filmsState: 'unactive',
      rocketState: 'active',
    }
  }

  componentDidMount () {
    const { url } = this.props
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

  handleClickRockets = (e) => {
    const { activeList } = this.state
    activeList === 'rockets' ? this.setState({ activeList: 'rockets'}) : this.setState({ activeList: 'rockets', filmsState: 'unactive', rocketState: 'active'})
  }
  
  handleClickFilms = (e) => {
    const { activeList } = this.state
    activeList === 'films' ? this.setState({ activeList: 'films'}) : this.setState({ activeList: 'films', filmsState: 'active', rocketState: 'unactive'})
  }
  
  render() {
    const { name, passengers, model, length, cost_in_credits, crew } = this.state.value
    const { rocketState, filmsState } = this.state
    const { pilots, films } = this.state
    console.log(this.state.value)

    return model === undefined ? <></> : (
      <React.Fragment>
        <h1>{name}</h1>
        <div className="icons-data">
          <div className='data'>
            <div className='img-container container'>
              <div className='text-description'>Passengers</div>
            </div>
            <div className='date container'>
              {passengers}
            </div>
          </div>
          <div className='data '>
            <div className='img-container container'>
              <div className='text-description'>Model</div>
            </div>
            <div className='gender-data container'>
              {model.split(' ')[0]}
            </div>
          </div>
          <div className='data '>
            <div className='img-container container'>
              <div className='text-description'>Length</div>
            </div>
            <div className='height-data container'>
              {length}
            </div>
          </div>
          <div className='data '>
            <div className='img-container container'>
              <div className='text-description'>Cost in credits</div>
            </div>
            <div className='mass-data container'>
              {cost_in_credits}
            </div>
          </div>
          <div className='data '>
            <div className='img-container container'>
              <div className='text-description'>Crew</div>
            </div>
            <div className='skin-color-data container'>
              {crew}
            </div>
          </div>
        </div>

        <div className="lists">
          <div className="icon-lists">
            <div className={`img-container rockets ${rocketState}`} onClick={this.handleClickRockets}>
              <div>
                Pilots
              </div>
            </div>
            <div className={`img-container films ${filmsState}`} onClick={this.handleClickFilms}>
              <div className="film">
                <div className='img'></div>
              </div>
            </div>
          </div>
          
          <div className={`list-data ships ${rocketState}`}>{pilots.length !== 0 ? pilots.map((person) => <div className='list-note' key={person.name}>{person.name}</div>) : 
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
