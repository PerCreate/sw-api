import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Select from 'react-select'

export const Menu = (props) => {
  const { value, page } = props
  const isPeople = page === 'people'
  const isPlanets = page === 'planets' //<Select className='filter' options={options}></Select>
  const options = [
    {value: 'population', label: 'Population'},
    {value: 'diametr', label: 'Diametr'}
  ]
  return <div className='content'>
    <main>
      <div className='title'>
        <span>{isPeople ? 'Who' : 'What'} about do you want to know?</span>
        {!isPlanets ? null : null}
      </div>
      <div className='menu'>
        {value.map((person, index) => {
          const { name, title } = person
          return <div key={index + 1}>
            <Link className='choose-link name-character' to={'/' + page + '/' + (index + 1)}>{name || title}</Link>
          </div>
        })}
      </div>
      <section>
        {props.children}
      </section>
    </main>
  </div>
}
