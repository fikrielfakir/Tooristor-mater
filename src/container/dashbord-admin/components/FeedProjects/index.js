import React from 'react'
import ItemView from '../UI DASHBORD/ItemView'



const FeedProjetcs = props => {
    
    return (
        <div className="FeedProjetcs">
            <div className="Headprojetc">
            <div className="InfoProjetcs">
            <div className="AvatarProjetc"><img src="/images/img1.png"/></div>
           <div className="HdeadContact">
            <div className="TitleMessage">Allison Curtis</div>
            <div className="EmailMessage">allison.curtis@gmail.com</div>
            </div></div>
            <div className="pageProjetcs"><a>View pharmacy page</a></div>
            </div>
            <div className="Messages">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.</div>
        <div className="Controlbutton"><button className="sumbit view">View products</button><button  className="sumbit drop">Delete Product</button><button  className="sumbit reset">Reset Password</button></div>
        </div>
      );
}

export default FeedProjetcs
