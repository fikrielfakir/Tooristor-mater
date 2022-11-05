import React from 'react'


const View = props => {
    
    return (
       <div className="BarreItem" >
        <div className="headitem">
        <div className={'imgView ' + props.loading}><img src={props.img} alt={props.title} /></div>
        <div className={'titleView ' + props.loading}>{props.title}</div></div>
        <div className="controlpost"><a><i class={props.editIcon} onClick={props.onClickedit}></i></a> 
        <a><i class={props.toggleIcon}></i></a>
        <a onClick={props.onClickdrop}><i class={props.DropIcon}></i></a> 
        {
            // icons optionals -fad fa-trash ===> drop  -fas fa-edit ===> edit   -fas fa-toggle-on ===> toggle switch
        }
        <a className={"viewmore " + props.loading} onClick={props.onClick}><i class="fas fa-chevron-right"></i></a>
        </div>
       </div>
    )
}

export default View
