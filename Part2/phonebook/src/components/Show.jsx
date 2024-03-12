const Show = ({filterValue, persons}) => persons.filter(person => person.name.toLowerCase().startsWith(filterValue.toLowerCase())).map(person => <p key={person.id}>{person.name} {person.number}</p>)

export default Show