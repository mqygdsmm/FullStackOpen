import { useState } from 'react'

const Display = ({content}) => <h1>{content}</h1>
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const DisplayNumber = ({content, number}) => <p>{content} {number}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <Display content="give feedback" />
      <Button onClick={() => {setGood(good + 1)}} text="good" />
      <Button onClick={() => {setNeutral(neutral + 1)}} text="neutral" />
      <Button onClick={() => {setBad(bad + 1)}} text="bad" />
      <Display content="statistics" />
      <DisplayNumber content="good" number={good} /> 
      <DisplayNumber content="neutral" number={neutral} /> 
      <DisplayNumber content="bad" number={bad} /> 
    </div>
  )
}

export default App