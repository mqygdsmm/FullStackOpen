import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const VisbilityFilter = () => {
  const dispatch = useDispatch()

  const handleFilterChange = (event) => {
    const filter = event.target.value
    dispatch(filterChange(filter))
  }

  return (
    <div>
      filter
      <input type='text' onChange={handleFilterChange}></input>
    </div>
  )
}

export default VisbilityFilter