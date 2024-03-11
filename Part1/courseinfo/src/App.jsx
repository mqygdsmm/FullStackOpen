const Course = (props) => {
  return (
    <div>
    <h1>{props.course.name}</h1>
    </div>
  )
} 

const Content = (props) => {
  return (
    <div>
      <Part content={props.course.parts[0]} />
      <Part content={props.course.parts[1]} />
      <Part content={props.course.parts[2]} />
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
      <p>Number of exercises {props.course.parts[0].exercise + props.course.parts[1].exercise + props.course.parts[2].exercise} </p>
    </div>
  )
} 
const App = () => {
  const course = {
    name:'Half Stack application development', 
    parts: [
      {part:'Fundamentals of React', exercise:10}, 
      {part:'Using props to pass data', exercise: 7}, 
      {part:'State of a component', exercise:14}],}
  const exercises = [10, 7, 14]

  return (
    <>
    <Course course={course}/>
    <Content course={course}/>
    <Total course={course}/>
    </>
  )
}

export default App