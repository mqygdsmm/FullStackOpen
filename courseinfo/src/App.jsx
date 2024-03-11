const Course = (props) => {
  return (
    <div>
    <h1>{props.course}</h1>
    </div>
  )
} 

const Content = (props) => {
  return (
    <div>
      <Part content={props.content[0]} />
      <Part content={props.content[1]} />
      <Part content={props.content[2]} />
    </div>
  )
} 

const Part = (props) => {
  return (
    <div>
      <p>{props.content.part} {props.content.exercise}</p>
    </div>
  )
} 

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.content[0].exercise + props.content[1].exercise + props.content[2].exercise} </p>
    </div>
  )
} 
const App = () => {
  const course = 'Half Stack application development'
  const content = [ {'part':'Fundamentals of React', 'exercise':10}, {'part':'Using props to pass data', 'exercise': 7}, {'part':'State of a component', 'exercise':14}]
  const exercises = [10, 7, 14]

  return (
    <>
    <Course course={course}/>
    <Content content={content}/>
    <Total content={content}/>
    </>
  )
}

export default App