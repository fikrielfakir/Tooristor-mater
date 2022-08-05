import React from 'react'


const View = props => {
    
    return (
       <div className="BarreItem">
        <div className='imgView'><img src={props.img} alt={props.title} /></div>
        <div className='titleView'>{props.title}</div>
        <div className='ViewMore'><i className={props.IconMore}></i></div>
       </div>
    )
}

export default View
