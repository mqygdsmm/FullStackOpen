import InputBar from "./InputBar"
const NewForm = ({newName, newNumber, onNameChange, onNumberChange, onClick}) => {
  return (
    <div>
      <form>
        <InputBar label='name' trackValue={newName} onChange={onNameChange} />
        <InputBar label='number' trackValue={newNumber} onChange={onNumberChange} />
        <div>
          <button type="submit" onClick={onClick}>add</button>
        </div>
      </form>
    </div>
  )
}

export default NewForm