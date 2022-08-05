import React from "react"
import Card from "../components/UI DASHBORD/Card"
import ListMessages from "../components/ListMessages"
import ListProducts from "../components/ListProducts"

const Settings = () => {
    return (
        <div className="content fs-6 d-flex flex-column flex-column-fluid">
            <div className="toolbar">
                <div className="container-fluid d-flex flex-stack flex-wrap flex-sm-nowrap">
                    <div className="d-flex flex-column align-items-start justify-content-center flex-wrap me-2"><div className="text-dark fw-bolder my-1 fs-2">General Settings</div></div>
                    <div className="d-flex align-items-center flex-nowrap text-nowrap py-1"></div>
                </div>
                <div className="ProfileSetting">
                    <div className="AvatarSetting"><img src="/images/profile.png"/></div>
                    <div className="NameSetting">Pharmacy Errahma</div>
                    <div className="inputSetting">
                        <input className="InSetting w100" placeholder="Project name"/>
                        <div className="Inputflex">
                            <input className="InSetting w50" placeholder="First name"/>
                            <input className="InSetting w50" placeholder="Last name"/>
                        </div>
                        <input className="InSetting w100" placeholder="Email address"/>
                        <input className="InSetting w100" placeholder="Phone number"/>
                        <input className="InSetting w100" value="R83984"/>
                    </div>
                    <div className="validationbutton"><button className="sumbit send">Send</button><button  className="sumbit cancel">Cancel</button></div>
                </div>
            </div>
        </div>
    )
}

export default Settings
