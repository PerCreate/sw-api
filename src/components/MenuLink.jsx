import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import React from 'react'
import { render } from '@testing-library/react'

export class MenuLink extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        keyActiveLink: null,
        value: this.props.value
    }
  }

  handleClick = (e) => {
    const uniqueKey  = e.target.id
    this.setState({ keyActiveLink: uniqueKey })
  }

  render() {
    const { page } = this.props
    const value = this.state.value
    const { keyActiveLink } = this.state

    return value.map((person, index) => {
    const { name, title } = person
    const uniqueKey = person.url.replace(/[^\d]/g, '')
    return <Link onClick={this.handleClick} id={uniqueKey} className={`name-character choose-link ${keyActiveLink === uniqueKey ? 'active' : ''}`} to={'/' + page + '/' + uniqueKey}>{name || title}</Link>
  })
  }
}
