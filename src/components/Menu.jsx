import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { MenuLink } from './MenuLink'

export const Menu = (props) => {
  const { value, page } = props
  const isPeople = page === 'people'
  const isPlanets = page === 'planets' //<Select className='filter' options={options}></Select>

  return <div className='content'>
    <main>
      <div className='title'>
        <span>{isPeople ? 'Who' : 'What'} do you want to learn about?</span>
        {!isPlanets ? null : null}
        <Link className='request-link' to='/'>Back</Link>
      </div>
      <div className='menu'>
        
        <MenuLink value={value} page={page} />
      </div>
      <section>
        {props.children}
      </section>
    </main>
  </div>
}
