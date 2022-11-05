import React from 'react'


const ItemProduct = props => {
    
    return (
        <tbody>
        <tr className={props.inStock == false ? ("ourStcok"):("ProductItemOwner")}  key={props.key} data-index={props.index}>
    
            <td><img className="produitOwner" src={props.IMG}/></td>
            <td>{props.Title}</td>
            <td>{props.prix}</td>
            <td>{props.date}</td>
            {/* <td>{props.View}</td> */}
            <td><div className="Action"><a onClick={props.onView}><i class="fad fa-eye"></i></a><a onClick={props.onClickedit}><i class="fas fa-edit"></i></a> <a onClick={props.onDrop}><i class="fad fa-trash"></i></a></div> </td>

        </tr>
    </tbody>
    )
}

export default ItemProduct
