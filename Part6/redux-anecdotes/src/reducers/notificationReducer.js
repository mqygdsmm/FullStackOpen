import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'there is a notification',
  reducers: {
    renderNotification(state, action) {
      return action.payload
    },

    clearNotification(state, action) {
      return ''
    }

  }
})

export const { renderNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer