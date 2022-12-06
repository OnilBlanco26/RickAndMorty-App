import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Autosuggest from 'react-autosuggest';

const FilteredLocations = ({hasError, setLocationInput}) => {

const[data, setData]= useState([]);
const[locations, setLocations]= useState([]);
const[value, setValue]= useState("");


const onSuggestionsFetchRequested=({value})=>{
  setLocations(filtrarLocations(value));
}

const filtrarLocations=(value)=>{
  const inputValue=value.trim().toLowerCase();
const inputLength=inputValue.length;

  var filtrado=data.filter((personaje)=>{
    var textoCompleto=personaje.name;

    if(textoCompleto.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .includes(inputValue)){
      return personaje;
    }
  });

  return inputLength===0 ? [] : filtrado;
}

const onSuggestionsClearRequested = () =>{
  setLocations([]);
}

const getSuggestionValue=(suggestion)=>{
  return `${suggestion.name}`;
}

const renderSuggestion=(suggestion)=>(
  <div className='sugerencia' onClick={()=>selectLocations(suggestion)}>
    {`${suggestion.name}`}
  </div>
);

const selectLocations=(id)=>{
    setLocationInput(id);
  }

const onChange=(e, {newValue})=>{
  setValue(newValue);
}

const inputProps={
className: 'inputSug',
placeholder:"Search Location...",
value,
onChange
};

const eventEnter=(e)=>{
if(e.key == "Enter"){
  var locat = data.filter(p => p.name == e.target.value.trim());

  
  let locatA = locat[0].id;
  setLocationInput(locatA)
  selectLocations(locatA)

}
}

// const handleClick = (e) => {
//     var personajeActual = data.filter(p => p.name == e.target.value.trim());

  
//   let personaje = personajeActual[0].id;
//   setLocationInput(personaje)
// }

const obtenerData=()=>{
    axios.get(`https://rickandmortyapi.com/api/location`).then(response=>{
    
      setLocations(response.data.results);
      setData(response.data.results);
    })
  }
  
  useEffect(()=>{
  obtenerData();
  }, []);




  return (
    <>
    <Autosuggest 
      suggestions={locations}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      onSuggestionSelected={eventEnter}
     />
     {/* <button onClick={handleClick} className={hasError ? `btn__search btn__change` : `btn__search`}><span><i className='bx bx-search'></i></span></button> */}
     </>
  )
}

export default FilteredLocations