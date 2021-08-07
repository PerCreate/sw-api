export const NavButtons = (props) => {
  const { handleClick, countPage } = props
  return (
    <>
      <button onClick={handleClick} className='btn-prev'>Prev</button>
      <input type="text" readOnly="readOnly" value={countPage}/>
      <button onClick={handleClick} className='btn-next'>Next</button>
    </>
  )
}

