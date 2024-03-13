import { useState, useEffect } from 'react'
import countriesinfoServices from './services/countriesinfo'
import Message from './components/Message'

const App = () => {
  const [countryName, setCountryName] = useState('')
  const [countryList, setCountryList] = useState(null)
  const [message, setMessage] = useState(null)



  useEffect(() => {
    if (countryName) {
      const candidates = countryList.filter(country => country.toLowerCase().startsWith(countryName.toLowerCase()))
      console.log(candidates)
      if (candidates.length > 10) {
        setMessage({directive:'tooMany' ,data:'Too many matches, specify another filter'})
      }
      else if (candidates.length > 1) {
        setMessage({directive:'candidate' ,data:{candidates, handleShow}})
      }
      else if (candidates.length === 1) {
        countriesinfoServices.getInfo(candidates[0])
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
      if (!countryList) {
        countriesinfoServices.getAll()
        .then(data => {
          setCountryList(data)
        })
      }
    }  
},[countryName])

  const handleShow = (country) => {
    setCountryName(country)
  }

  const handleOnChange =(event) => {
    setCountryName(event.target.value)
  }

  return (
    <div>
      find countries <input value={countryName} onChange={handleOnChange} />
      <Message message={message}/>
    </div>
  )
}
export default App
