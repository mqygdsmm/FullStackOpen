import { useState, useEffect } from 'react'
import countriesinfoServices from './services/countriesinfo'
import Message from './components/Message'

const App = () => {
  const [countryName, setCountryName] = useState('')
  const [countryList, setCountryList] = useState(null)
  const [message, setMessage] = useState(null)



  useEffect(() => {
    countriesinfoServices.getAll()
    .then(data => {
      setCountryList(data)
    })
},[])
  const handleOnChange =(event) => {
    const value = event.target.value
    setCountryName(value)
    if (value) {
      const candidate = countryList.filter(country => country.toLowerCase().startsWith(value.toLowerCase()))
      console.log(candidate)
      if (candidate.length > 10) {
        setMessage({directive:'tooMany' ,data:'Too many matches, specify another filter'})
      }
      else if (candidate.length > 1) {
        setMessage({directive:'candidate' ,data:candidate})
      }
      else if (candidate.length === 1) {
        countriesinfoServices.getInfo(candidate[0])
        .then(info => {
          setMessage({directive:'info' ,data:info})
        })
      }
      else {
        setMessage(null)
      }
    }
    else {
      setMessage(null)
    }  
  }
  return (
    <div>
      find countries <input value={countryName} onChange={handleOnChange} />
      <Message message={message}/>
    </div>
  )
}
export default App
