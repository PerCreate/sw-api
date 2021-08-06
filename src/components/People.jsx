import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Character } from './Character';
import { Table } from './Table';


export class People extends React.Component {
  static defaultProps = {
    url: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      value: [],
      currendPage: '/' + this.props.page
    }
  }

  componentDidMount() {
    const { url } = this.props
    fetch(url)
      .then((request) => request.json())
      .then((request) => this.setState({ value: request.results }))
      .catch((e) => e)
  }

  render() {
    const value = Object.values(this.state.value)
    const { page, url } = this.props
    return (
      <React.Fragment>
        <Router>
          <div className='content'>
            <Table page={page} people={value}>
              {value.map((person, index) => {
                const path = '/' + page + '/' + (index + 1)
                const { url } = person
                return <Route key={index + 1} path={path} component={() => <Character path={path} url={url} />} />
              })}
            </Table>
          </div>
        </Router>
        <Link className='request-link' to='/'>Back</Link>
      </React.Fragment>
    )
  }
}
