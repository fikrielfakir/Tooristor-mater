import React from 'react'

const Additeminput = props => {

    return (
        <div className="FeedProjetcs">
            <div className="Headprojetc">
                <div className="InfoProjetcs">
                    <div className="AvatarProjetc"><img src="/images/img1.png" /></div>
                    <div className="HdeadContact">
                    <form className="flex-container" onSubmit={props.onSubmit}> 
                    <input type="file" name={props.nameFile} onChange={props.onChangeFile}/>
                        <input type="text" value={props.valuename} onChange={props.onChange} name={props.nameName} placeholder="Name" />
                        <input type="text" value={props.valuedesc} onChange={props.onChange} name={props.nameDes} placeholder="Description"/>
                       <div className="Controlbutton"><button className="sumbit view">Add shop</button></div>
                        </form>
                        <div className="EmailMessage">{props.email}</div>
                    </div></div>
                <div className="pageProjetcs"><a>View pharmacy page</a></div>
            </div>
            
        </div>
    );
};
export default Additeminput
