import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

export const Table = (props) => {
  const { people, page } = props
  return <main>
    <div className='title'>
      <span>Who about do you want to know?</span>
    </div>
    <div className='menu'>
      
      {people.map((person, index) => {
        const { name } = person
        return <div key={index + 1}>
          <div className='name-character'><Link className='choose-link' to={'/' + page + '/' + (index + 1)}>{name}</Link></div>
        </div>
      })}
    </div>
    <section>
      {props.children}
    </section>
  </main>

}
