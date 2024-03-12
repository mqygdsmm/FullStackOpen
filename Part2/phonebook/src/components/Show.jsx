const Show = ({filterValue, persons, onClick}) => 
persons.filter(
    person => person.name.toLowerCase().startsWith(filterValue.toLowerCase()))
    .map(person => 
    <p key={person.id}>
        {person.name} {person.number}
        <button onClick={() => onClick(person.id)}>delete</button>
    </p>)

export default Show