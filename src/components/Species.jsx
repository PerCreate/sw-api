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
      films: [],
      activeList: 'rockets',
      filmsState: 'unactive',
      rocketState: 'active',
      homeworld: '',
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
    .then((film) => film.map((film) => fetch(film).then((data) => data.json()).then((data) => this.setState((prev) => ({ films: [...prev.films, data]})))))
    fetch(url)
    .then((request) => request.json())
    .then((request) => request.homeworld)
    .then((homeworld) => fetch(homeworld).then((data) => data.json()).then((data) => this.setState({homeworld: data}))) //get films
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
    const { name, average_height, average_lifespan, classification, designation } = this.state.value
    const { films, people, rocketState, filmsState, homeworld } = this.state

    return (
      <React.Fragment>
        <h1>{name}</h1>
        <div className="icons-data">
          <div className='data'>
            <div className='img-container container'>
              <div className='text-description'>Average height</div>
            </div>
            <div className='date container'>
              {average_height}
            </div>
          </div>
          <div className='data '>
            <div className='img-container container'>
              <div className='text-description'>Average Lifespan</div>
            </div>
            <div className='gender-data container'>
              {average_lifespan}
            </div>
          </div>
          <div className='data '>
            <div className='img-container container'>
              <div className='text-description'>Classification</div>
            </div>
            <div className='height-data container'>
              {classification}
            </div>
          </div>
          <div className='data '>
            <div className='img-container container'>
              <div className='text-description'>Designation</div>
            </div>
            <div className='mass-data container'>
              {designation}
            </div>
          </div>
          <div className='data '>
            <div className='img-container container'>
              <div className='text-description'>homeworld</div>
            </div>
            <div className='skin-color-data container'>
              {homeworld.name}
            </div>
          </div>
        </div>

        <div className="lists">
          <div className="icon-lists">
            <div className={`img-container rockets ${rocketState}`} onClick={this.handleClickRockets}>
              <div>
                People
              </div>
            </div>
            <div className={`img-container films ${filmsState}`} onClick={this.handleClickFilms}>
              <div className="film">
                <div className='img'></div>
              </div>
            </div>
          </div>
          
          <div className={`list-data ships ${rocketState}`}>{people.length !== 0 ? people.map((person) => <div className='list-note' key={person.name}>{person.name}</div>) : 
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
