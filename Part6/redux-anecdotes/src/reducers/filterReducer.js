const filterReducer = (state='', action) => {
  if (action.type === 'SET_FILTER') {
    return action.payload
  }
  else {
    return state
  }
}

export const filterChange = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: filter
  }
}

export default filterReducer