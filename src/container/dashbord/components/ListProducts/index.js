import React from 'react'
import ItemView from '../UI DASHBORD/ItemView'



const ListMessage = props => {
    
    return (
        <div className="ListItem">
      <div className='TitleList'>{props.Title}</div>
       <ItemView img="./images/p1.png"
       title="lorem ipsum"
       IconMore="SED"
       />
       <ItemView img="./images/p2.png"
       title="lorem ipsum"
       IconMore="SED"
       />
       <ItemView img="./images/p3.png"
       title="lorem ipsum"
       IconMore="SED"
       />
       <ItemView img="./images/p4.png"
       title="lorem ipsum"
       IconMore="SED"
       />
       </div>
    )
}

export default ListMessage
