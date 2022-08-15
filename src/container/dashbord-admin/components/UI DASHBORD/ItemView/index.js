import React from 'react'


const View = props => {
    
    return (
       <div className="BarreItem" >
        <div className="headitem">
        <div className='imgView'><img src={props.img} alt={props.title} /></div>
        <div className='titleView'>{props.title}</div></div>
        <div className="controlpost"><a><i class="fas fa-edit" onClick={props.onClickedit}></i></a> <a><i class="fas fa-toggle-on"></i></a><a onClick={props.onClickdrop}><i class="fad fa-trash"></i></a><a className="viewmore" onClick={props.onClick}><i class="fas fa-chevron-right"></i></a></div>
       </div>
    )
}

export default View
