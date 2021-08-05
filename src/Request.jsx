import React from 'react';

export class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      url: 'https://swapi.dev/api/',
    }
  }

  componentDidMount () {
    const { url } = this.state;
    fetch(url)
    .then((request) => request.json())
    .then((request) => {
      const arr = Object.entries(request)
      this.setState({ items: arr})
    })
    .catch((e) => e)
  }
  
  render() {   
    return (
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>API</th>
          </tr>
        </thead>
        <tbody>
          {this.state.items.map(([name, http], index) => {
            return (
              <tr key={http}>
                <td>{index + 1}</td>
                <td>{name}</td>
                <td>{http}</td>
                <td><button type='button'>Open page</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}
