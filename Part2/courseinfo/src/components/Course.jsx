const Header = ({name}) => <h1>{name}</h1>
const Content = ({parts}) => parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
const Sum = ({parts}) => <p>Total of {parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)} exercises</p>
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

export default Course