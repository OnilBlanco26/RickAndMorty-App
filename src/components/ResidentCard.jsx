import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ResidentCard = ({url}) => {

    const [resident, setResident] = useState()


    useEffect(() => {
        axios.get(url)
        .then(res => setResident(res.data))
        .catch(err => console.log(err))
    }, [])

    const arrColor = ['gray' , 'green', 'red'];

    const getColor = (array) => {
        let indexColor;
        if(resident?.status === 'Alive') {
            indexColor = array[1];
        } else if(resident?.status === 'Dead') {
            indexColor = array[2];
        } else if(resident?.status === 'unknown'){
            indexColor = array[0];
        }

        return indexColor;
    }

  

    const objStyle = {
        backgroundColor: getColor(arrColor)
    }


  return (
    <article className='card'>
        <header className='card__header'>
            <img className='card__image' src={resident?.image} alt="" />
            <div className='card__status'>
                <span className="circle" style={objStyle}><div></div></span>
                <span className='status__info'>{resident?.status}</span>
            </div>
        </header>
        <section className='card__section'>
            <h3 className='card__section-name'>{resident?.name}</h3>
            <ul className='card__section-list'>
                <li className='card__section-list--item'><span className='card__section-list--span1'>Species</span><span className='card__section-list--span2'>{resident?.species}</span></li>
                <li className='card__section-list--item'><span className='card__section-list--span1'>Origin</span><span className='card__section-list--span2'>{resident?.origin.name}</span></li>
                <li className='card__section-list--item'><span className='card__section-list--span1'>Episodes where appear</span><span className='card__section-list--span2'>{resident?.episode.length}</span></li>
            </ul>
        </section>
    </article>
  )
}

export default ResidentCard