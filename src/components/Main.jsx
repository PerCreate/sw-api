import { Menu } from './Menu';
import { NavButtons } from './NavButtons';

export const Main = (props) => {
  const { page, value, countPage, handleClick, stateLeftArr, stateRightArr } = props
  return <>
    <Menu page={page} value={value}>
      {props.children}
      </Menu>
      <NavButtons stateLeftArr={stateLeftArr} stateRightArr={stateRightArr} handleClick={handleClick} countPage={countPage} />
    </>
}

