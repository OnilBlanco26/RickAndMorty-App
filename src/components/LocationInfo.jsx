import React from 'react'

const LocationInfo = ({location}) => {
  return (
    <article className='locationInfo'>
        <h2 className='locationInfo__name'>{location?.name}</h2>
        <ul className='locationInfo__list'>
            <li className='locationInfo__list-item'><span>Type </span> {location?.type}</li>
            <li className='locationInfo__list-item'><span>Dimension </span>{location?.dimension}</li>
            <li className='locationInfo__list-item'><span>Population </span>{location?.residents.length}</li>
        </ul>
    </article>
  )
} 

export default LocationInfo