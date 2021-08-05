import React from 'react';


export class People extends React.Component {
  static defaultProps = {
    url: 'https://swapi.dev/api/people/'
  }

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount () {
    const { url } = this.props
    fetch(url)
    .then((request) => request.json())
    .then((request) => this.setState(request.results))
    .catch((e) => e)
  }
  
  render() {
    const people = Object.values(this.state)
    console.log(people)
    return (
    <div>
    <table>
        <thead>
          <tr>
            <th>name</th>
            <th>height</th>
            <th>mass</th>
            <th>skin_color</th>
            <th>gender</th>
            <th>films</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => {
            const { name, height, mass, skin_color, gender, films} = person
            return <tr key={index + 1}>
              <td>{name}</td>
              <td>{height}</td>
              <td>{mass}</td>
              <td>{skin_color}</td>
              <td>{gender}</td>
              <td>{films[0]}</td>
            </tr>
          })}
        </tbody>
      </table>
      <button type='button'>Back</button>
      </div>
    )
  }
}
