import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    renderNotification(state, action) {
      return action.payload
    },

    clearNotification() {
      return ''
    }

  }
})

export const { renderNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer


export const setNotification = (message, delayInSecond) => {
  return dispatch => {
    dispatch(renderNotification(message))
    setTimeout(() => dispatch(clearNotification()), delayInSecond * 1000)
  }
}