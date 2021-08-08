export const NavButtons = (props) => {
  const { handleClick, countPage } = props
  return (
    <div className='buttons'>
      <button onClick={handleClick} className='btn btn-prev'>
        <div className="arrow-left"></div>
      </button>
      <input className='btn' type="text" readOnly="readOnly" value={countPage}/>
      <button onClick={handleClick} className='btn btn-next'>
      <div className="arrow-right"></div>
      </button>
    </div>
  )
}

