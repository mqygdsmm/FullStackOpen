import { useReducer, createContext, useContext } from "react";
import PropTypes from 'prop-types'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'setNotification':
      return action.payload
    case 'clearNotification':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={ [notification, notificationDispatch] } >
      {props.children}
    </NotificationContext.Provider>
  )
}


export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const useRenderNotification = () => {
  const notificationDispatch = useNotificationDispatch()
  return (payload) => {
    notificationDispatch({type: 'setNotification', payload})
    setTimeout(() => {
      notificationDispatch({type: 'clearNotification'})
    }, 5000)
  }


}

NotificationContextProvider.propTypes = {
    children: PropTypes.object.isRequired
}

export default NotificationContext