import React from 'react'
import ItemView from '../UI DASHBORD/ItemView'



const ListMessage = props => {
    
    return (
        <div className="ListItem">
      <div className='TitleList'>{props.Title}</div>
       <ItemView img="./images/img1.png"
       title="Abilify 10mg Allison Curtis"
       IconMore="SED"
       />
       <ItemView img="./images/img2.png"
       title="Makenna Schleifer"
       IconMore="SED"
       />
       <ItemView img="./images/img3.png"
       title="Ahmad Workman"
       IconMore="SED"
       />
       <ItemView img="./images/img4.png"
       title="Chance Dorwart"
       IconMore="SED"
       />
       </div>
    )
}

export default ListMessage
