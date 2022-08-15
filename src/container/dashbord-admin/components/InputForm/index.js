import React from 'react'

const InputFrom = props => {

    return (
        <div className="FeedProjetcs">
            <div className="Headprojetc">
                <div className="InfoProjetcs">
                    <div className="AvatarProjetc"><img src="/images/img1.png" /></div>
                    <div className="HdeadContact">
                        <input type="text" value={props.value} onChange={props.onChange} name={props.name} />
                        <div className="EmailMessage">{props.email}</div>
                    </div></div>
                <div className="pageProjetcs"><a>View pharmacy page</a></div>
            </div>
          <textarea className="Messages" value={props.value} onChange={props.onChange} name={props.name} />
            <div className="Controlbutton"><button className="sumbit view">View products</button><button className="sumbit drop" onClick={props.onClick}>Delete Product</button><button className="sumbit reset">Reset Password</button></div>
        </div>
    );
}

export default InputFrom
