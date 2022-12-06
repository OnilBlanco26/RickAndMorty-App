import axios from 'axios'
import React, { useEffect, useState } from 'react'
import imgrickAlive from '../assets/img/rickAlive.png'
import imgrickDead from '../assets/img/rickDead.png'
import imgrickUnk from '../assets/img/rickUnknown.png'


const ResidentCard = ({url}) => {

    const [resident, setResident] = useState()


    useEffect(() => {
        axios.get(url)
        .then(res => setResident(res.data))
        .catch(err => console.log(err))
    }, [])

    const rickImgg =  () => {
        let text = '';
        if(resident?.status === 'Alive') {
            text = imgrickAlive
        } else if(resident?.status === 'Dead') {
            text = imgrickDead
        } else if(resident?.status === 'unknown'){
            text = imgrickUnk
        }
        return text;
    }

    const fnRick = () => {
        let text = '';
        if(resident?.status === 'Alive') {
            text = 'rickImg rickImgAlive'
        } else if(resident?.status === 'Dead') {
            text = 'rickImg'
        } else if(resident?.status === 'unknown'){
            text = 'rickImg'
        }
        return text;
    }

    const cardColor = () => {
        let text = '';
        if(resident?.status === 'Alive') {
            text = `card__section-list--span2 list__Alive`
        } else if(resident?.status === 'Dead') {
            text = `card__section-list--span2 list__Dead`
        } else {
            text = `card__section-list--span2 list__Unknown`
        }
        return text
    }

    const BgColor = () => {
        let text = '';
        if(resident?.status === 'Alive') {
            text = `card cardBG`
        } else if(resident?.status === 'Dead') {
            text = `card cardBR`
        } else {
            text = `card cardBW`
        }
        return text
    }
  

  return (
    <article className={BgColor()}>
        
        <header className='card__header'>
            <div className='rickImg__card'>
                <img className={fnRick()} src={rickImgg()} alt="" />
            </div>
            <img className='card__image' src={resident?.image} alt="" />
            <div className='card__status'>
                <div className={`circle ${resident?.status}`}></div>
                <span className='status__info'>{resident?.status}</span>
            </div>
        </header>
        <section className='card__section'>
           
            <h3 className='card__section-name'>{resident?.name}</h3>
            <div className={`card__line ${resident?.status}`}></div>
            <ul className='card__section-list'>
                <li className='card__section-list--item'><span className='card__section-list--span1'>Species</span><span className={cardColor()}>{resident?.species}</span></li>
                <li className='card__section-list--item'><span className='card__section-list--span1'>Origin</span><span className={cardColor()}>{resident?.origin.name}</span></li>
                <li className='card__section-list--item'><span className='card__section-list--span1'>Episodes where appear</span><span className={cardColor()}>{resident?.episode.length}</span></li>
            </ul>
        </section>
    </article>
  )
}

export default ResidentCard