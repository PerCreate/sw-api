import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Character } from './Character';
import { Films } from './Films';
import { Planets } from './Planets';
import { Species } from './Species';
import { Starships } from './Starships';
import { Vehicles } from './Vehicles';
import { Main } from './Main';


export class Sample extends React.Component {
  static defaultProps = {
    url: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      prevValue: {},
      currendPage: '/' + this.props.page,
      countPage: 1,
      prevPage: '',
      nextPage: '',
      filterBy: '',
      links: []
    }
  }

  filteringPlanets = () => {
    const { filterBy } = this.state
    switch(filterBy) {

    }
  }

  handleClick = (e) => {
    e.preventDefault()
    const typeBtn = e.target.className
    const { countPage, prevPage, nextPage } = this.state
    if(typeBtn.includes('btn-prev') && prevPage) {
      this.setState({ countPage: countPage - 1 })
      this.request(prevPage)
    }
    if(typeBtn.includes('btn-next') && nextPage) {
      this.setState({ countPage: countPage + 1 })
      this.request(nextPage)
    }
  }

  request = (url = this.props.url) => {
    const { value } = this.state
    this.setState({ prevValue: value })
    fetch(url)
      .then((request) => request.json())
      .then((request) => this.setState({ value: request.results, prevPage: request.previous, nextPage: request.next }))
      .catch((e) => e)
  }

  componentDidMount() {
    this.request()
  }

  handleClickMenuBtn = (e) => {

  }
  

  render() {
    const value = Object.values(this.state.value)
    const { page } = this.props
    const currentState = this.state.value
    const prevState = this.state.prevValue //If cuurentState === prevState we don't need render with 'value' prop
    return currentState === prevState ? <Main page={page} value={value} handleClick={this.handleClick} countPage={this.state.countPage} />: (
      <React.Fragment>
        <Route path={'/' + page}>
          <Main page={page} value={value} handleClick={this.handleClick} countPage={this.state.countPage}>
          {value.map((data, index) => {
                  const path = '/' + page + '/' + (index + 1)
                  const { url } = data
                  switch(page) {
                    case 'people':
                      return <Route key={index + 1} path={path} component={() => <Character path={path} url={url} />} />
                    case 'planets':
                      return <Route key={index + 1} path={path} component={() => <Planets path={path} url={url} />} />
                    case 'films':
                      return <Route key={index + 1} path={path} component={() => <Films path={path} url={url} />} />
                    case 'species':
                      return <Route key={index + 1} path={path} component={() => <Species path={path} url={url} />} />
                      case 'vehicles':
                      return <Route key={index + 1} path={path} component={() => <Vehicles path={path} url={url} />} />
                    case 'starships':
                      return <Route key={index + 1} path={path} component={() => <Starships path={path} url={url} />} />
                    default:
                      return <Route key={index + 1} path={path} component={() => <Character path={path} url={url} />} />
                  }
          })}
          </Main>
        </Route>
      </React.Fragment>
    )
  }
}
