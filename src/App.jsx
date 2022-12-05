import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import ErrorFetch from './components/ErrorFetch'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'
import Particle from './components/Particle'
import imgBack1 from '../src/assets/img/img1.png'

function App() {


  const [location, setLocation] = useState()
  const [locationInput, setLocationInput] = useState()
  const [hasError, sethasError] = useState(false)

 
  useEffect(() => {
    
    let URL
    if(locationInput) {
      URL = `https://rickandmortyapi.com/api/location/${locationInput}`
    } else {
      const randomIdLocation = Math.floor(Math.random() * 126) + 1
      URL = `https://rickandmortyapi.com/api/location/${randomIdLocation}`
    }


    axios.get(URL)
    .then(res => {

      setLocation(res.data)
      sethasError(false)
    
    })
    .catch((err) => {
      if(locationInput!==0){
      sethasError(true)
      console.log(err)
      }
    })
  }, [locationInput])  



  const handleSubmit = (e) => {
    e.preventDefault();
    setLocationInput(e.target.inputSearch.value)
  }
  

  return (
    <div className="App">
      <Particle />
      <img src={imgBack1} className='headerImg' />
       
   
      <div className="imgName">
          <img  alt="" />
        </div>
      <form className='headerForm' onSubmit={handleSubmit} action="">
        <input id='inputSearch' type="text" placeholder='Search for a location...' />
        <button className={hasError ? `btn__search btn__change` : `btn__search`}><span><i class='bx bx-search'></i></span></button>
      </form>
      { hasError ?
      
      <ErrorFetch /> 
      
      : 
      <>
      <LocationInfo 
        location = {location}
      /> 
      <div className='residents-container'>
        {
          location?.residents.map(url => (
            <ResidentCard 
            key={url}
            url = {url} 
            />
          ))
        }
      </div>
      </>
      }
      </div>
    
  )
}

export default App
