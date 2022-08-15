import React from 'react'


const Card = props => {
    
    return (
        <div className={'CardOverView ' + props.color} >
    <div className='Status'><i className={props.icon}></i><div className='StatusView'>{props.view}</div></div>
        <div className='nameView'>{props.name}</div>
        </div>
    )
}

export default Card
