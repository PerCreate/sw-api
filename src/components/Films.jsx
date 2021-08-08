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
      planets: [],
      activeList: 'rockets',
      filmsState: 'unactive',
      rocketState: 'active'
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

  handleClickRockets = (e) => {
    const { activeList } = this.state
    activeList === 'rockets' ? this.setState({ activeList: 'rockets'}) : this.setState({ activeList: 'rockets', filmsState: 'unactive', rocketState: 'active'})
  }

  handleClickFilms = (e) => {
    const { activeList } = this.state
    activeList === 'films' ? this.setState({ activeList: 'films'}) : this.setState({ activeList: 'films', filmsState: 'active', rocketState: 'unactive'})
  }
  
  render() {
    const { title, director, episode_id, opening_crawl, producer } = this.state.value
    const { characters, planets, rocketState, filmsState } = this.state
    console.log(producer)
    return producer === undefined ? <></> : (
      <React.Fragment>
        <h1>{title}</h1>
        <div className="icons-data">
          <div className='data film'>
            <div className='img-container container film'>
              <div className='text-description'>Director</div>
            </div>
            <div className='date container film'>
              {director}
            </div>
          </div>
          <div className='data film'>
            <div className='img-container container film'>
              <div className='text-description'>Episode</div>
            </div>
            <div className='gender-data container film'>
              {episode_id}
            </div>
          </div>
          <div className='data film'>
            <div className='img-container container film'>
              <div className='text-description'>Producer</div>
            </div>
            <div className='height-data container film'>
              {producer.split(',').length > 1 ? producer.split(',')[0] + ' et al.' : producer}
            </div>
          </div>
        </div>

        <div className='opening'>
            <div className='img-container container '>
              <div className='text-description'>Opening Crawl</div>
            </div>
            <div className='crawl-container'>
              {opening_crawl}
            </div>
          </div>

        <div className="lists films">
          <div className="icon-lists">
            <div className={`img-container rockets ${rocketState}`} onClick={this.handleClickRockets}>
                <div>Planets</div>
            </div>
            <div className={`img-container films ${filmsState}`} onClick={this.handleClickFilms}>
                <div>Characters</div>
            </div>
          </div>
          
          <div className={`list-data ships ${rocketState}`}>{planets.length !== 0 ? planets.map((person) => <div className='list-note' key={person.name}>{person.name}</div>) : 
            <div className='list-note'>
              None
            </div>}
          </div>
          <div className={`list-data films ${filmsState}`}>{characters.map((person) => <div  className='list-note' key={person.name}>{person.name}</div>)}</div>
        </div>
      </React.Fragment>
    )
  }
}
