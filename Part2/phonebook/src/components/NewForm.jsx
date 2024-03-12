const NewForm = ({newName, newNumber, onNameChange, onNumberChange, onClick}) => {
  return (
    <div>
      <form>
        <div>
          name: <input value={newName} onChange={onNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={onNumberChange}/>
        </div>
        <div>
          <button type="submit" onClick={onClick}>add</button>
        </div>
      </form>
    </div>
  )
}

export default NewForm