import React from 'react'


const ItemCategory = props => {
    
    return (
        <tbody>
        <tr className="ProductItemOwner"  key={props.key} data-index={props.index}>
    
            <td>{props.ID}</td>
            <td><img className="produitOwner" src={props.IMG}/>{props.Title}</td>
            <td>{props.children}</td>
            <td><div className="Action">
                {/* <a onClick={props.onClickedit}><i class="fas fa-edit"></i></a>  */}
                <a onClick={props.onDrop}><i class="fad fa-trash"></i></a></div></td>
         

        </tr>
    </tbody>
    )
}

export default ItemCategory
