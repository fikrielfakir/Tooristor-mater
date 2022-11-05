import React from 'react'
import { Toggle } from 'rsuite';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';


const View = props => {
    
    return (
       <div className="BarreItem" >
        <div className="headitem">
        <div className={'imgView ' + props.loading}><img src={props.img} alt={props.title} /></div>
        <div className={'titleView ' + props.loading}>{props.title}</div></div>
        <div className="controlpost"><a><i class={props.editIcon} onClick={props.onClickedit}></i></a> 
        <a onClick={props.onClickdrop}><i class={props.DropIcon}></i></a> 
        { props.isActive === true? (<td> <a onClick={props.onAprove}><i class={props.iconAprove}></i></a></td>):
                                      (<td> <a onClick={props.onDisaprove}><i class={props.iconDisaprove}></i></a></td>)
           
        }
        <a className={"viewmore " + props.loading} onClick={props.onClick}><i class="fas fa-chevron-right"></i></a>
        </div>
       </div>
    )
}

export default View
