export const NavButtons = (props) => {
  const { handleClick, countPage, stateRightArr, stateLeftArr } = props
  return (
    <div className='buttons'>
      <button onClick={handleClick} className={`btn btn-prev arrow-left ${stateLeftArr}`}>
      </button>
      <input className='btn text' type="" readOnly="readOnly" value={countPage}/>
      <button onClick={handleClick} className={`btn btn-next arrow-right ${stateRightArr}`}>
      </button>
    </div>
  )
}

