import React from 'react'


const Itemoffre = props => {
    
    return (
        <tbody>
        <tr className="ProductItemOwner"  key={props.key} data-index={props.index}>
            <td><img className="produitOwner" src={props.IMG}/></td>
            <td>{props.shop}</td>
            <td>{props.product}</td>
            <td>{props.start}</td>
            <td>{props.end}</td>
            <td><div className="Action">
                {/* <a onClick={props.onClickedit}><i class="fas fa-edit"></i></a> */}
                 <a onClick={props.onDrop}><i class="fad fa-trash"></i></a></div></td>
            <td></td>

        </tr>
    </tbody>
    )
}

export default Itemoffre
