import React from 'react'


const ItemProduct = props => {
    
    return (
        <tbody>
        <tr className="ProductItemOwner"  key={props.key} data-index={props.index}>
    
            <td>{props.ID}</td>
            <td><img className="produitOwner" src={props.IMG}/>{props.Title}</td>
            <td>{props.prix}</td>
            <td>{props.date}</td>
            <td>{props.View}</td>
            <td> <a onClick={props.onDrop}><i class="fad fa-trash"></i></a></td>
            <td><a onClick={props.onClickedit}><i class="fas fa-edit"></i></a></td>

        </tr>
    </tbody>
    )
}

export default ItemProduct
