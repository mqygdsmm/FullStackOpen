import { useState } from 'react'

const Display = ({content}) => <h1>{content}</h1>
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const StatisticsLine = ({content, number}) => <tr><td>{content}</td> <td>{Math.round(number * 10) / 10}</td></tr>
const Statistics = ({good, neutral, bad}) => {
  if ((good + neutral + bad) !== 0) {
    return (
      <div>
        <StatisticsLine content="good" number={good} /> 
        <StatisticsLine content="neutral" number={neutral} /> 
        <StatisticsLine content="bad" number={bad} /> 
        <StatisticsLine content="average" number={(good - bad) / (good + bad + neutral)} /> 
        <tr><td>positive</td><td>{Math.round(good / (good + bad + neutral) * 1000) / 10}%</td> </tr>
      </div>
    )
  }
  else {
    return (
      <p>No feedback given</p>
    )
  }
}
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App