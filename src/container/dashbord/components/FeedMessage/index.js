import React from 'react'



const FeedMessage = () => {
    
    return (
        <div className="FeedMessage">
            <div className="Headinfo">
            <div className="AvatarMessage"><img src="/images/img1.png"/></div>
            <div className="TitleMessage">Allison Curtis</div>
            <div className="EmailMessage">allison.curtis@gmail.com</div>
            </div>
            <div className="Messages">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.</div>
        <div className="validationbutton"><button className="sumbit send">Reply</button><button  className="sumbit drop">Delete</button></div>
        </div>
      );
}

export default FeedMessage
