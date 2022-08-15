import React from 'react'
import ItemView from '../UI DASHBORD/ItemView'



const FeedProjetcs = props => {
    
    return (
        <div className="FeedProjetcs">
            <div className="Headprojetc">
            <div className="InfoProjetcs">
            <div className="AvatarProjetc"><img src="/images/img1.png"/></div>
           <div className="HdeadContact">
            <div className="TitleMessage">{props.name}</div>
            <div className="EmailMessage">{props.email}</div>
            </div></div>
            <div className="pageProjetcs"><a>View pharmacy page</a></div>
            </div>
            <div className="Messages">{props.description}</div>
        <div className="Controlbutton"><button className="sumbit view">View products</button><button  className="sumbit drop" onClick={props.onClickdelete}>Delete Product</button><button  className="sumbit reset" onClick={props.onClickEdit}>Edit Shop</button></div>
        </div>
      );
}

export default FeedProjetcs
