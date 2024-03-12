const Header = ({name}) => <h2>{name}</h2>
const Content = ({parts}) => parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
const Sum = ({parts}) => <p>Total of {parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)} exercises</p>

const Courses = ({courses}) => {
    console.log({courses})
    return (
        <div>
        <h1>Web development curriculum</h1>
        {courses.map(course => <Course key={course.id} course={course} />)}
        </div>
    )
}
const Course = ({course}) => {
    let {id, name, parts} = course
    return (
        <div>
        <Header name={name}/>
        <Content parts={parts}/>
        <Sum parts={parts} />
        </div>
    )
}

export default Courses