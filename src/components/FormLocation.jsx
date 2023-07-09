
import getRandomNumber from "../utils/getRandomNumber"

const FormLocation = ({ setIdLocation }) => {

const handleSubmit = e => {
e.preventDefault()
let inputValue = e.target.inputId.value.trim()


if (inputValue === '' || inputValue === "0" || inputValue < 1 || inputValue < 126){
  setIdLocation(getRandomNumber(126))
}else {
  setIdLocation(inputValue)
}
e.target.inputId.value = '' 
} 

  return (
    <form onSubmit={handleSubmit}>
    <input id="inputId" className="input" style={{ bosShadow: '1px 1px 10px'}}type="text" />
    <button style={{ backgroundColor: 'green', color: 'white'}}>Search</button>
   </form>
  )
}

export default FormLocation
