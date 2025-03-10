const Persons = ({ persons, onClick }) => {
  return (
    <ul>
      {persons.map(person => (
        <li key={person.id}>
          {person.name} - {person.number}
          <button onClick={() => onClick(person.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}

export default Persons
