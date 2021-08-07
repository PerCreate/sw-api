import { Menu } from './Menu';
import { NavButtons } from './NavButtons';
import { Link } from 'react-router-dom'


export const Main = (props) => {
  const { page, value, countPage, handleClick } = props
  return <>
    <Menu page={page} value={value}>
      {props.children}
      </Menu>
      <NavButtons handleClick={handleClick} countPage={countPage} />
    <Link className='request-link' to='/'>Back</Link></>
}

