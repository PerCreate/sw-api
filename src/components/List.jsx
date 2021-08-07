import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

export const List = (props) => { 
    const { items } = props
    return (
      <div className='content list'>
        <table>
          <thead>
            <tr>
              <th><div className='th-line'><span>Number</span><div className='line'></div></div></th>
              <th><div className='th-line'><span>Name</span><div className='line'></div></div></th>
              <th><div className='th-line'><span>API</span><div className='line'></div></div></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map(([name, http], index) => {
              return (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{name}</td>
                  <td>{http}</td>
                  <td><Link to={'/' + name} className='request-link'>Open page</Link></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
}
