import React from 'react'


const ItemProduct = props => {
    
    return (
        <tbody>
        <tr className="ProductItemOwner">

            <td>{props.ID}</td>
            <td><img className="produitOwner" src={props.IMG}/>{props.Title}</td>
            <td>{props.prix}</td>
            <td>{props.date}</td>
            <td>{props.View}</td>
            <td>{props.qn}</td>
            <td></td>

        </tr>
    </tbody>
    )
}

export default ItemProduct
