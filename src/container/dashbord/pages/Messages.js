import React from "react"
import ListMessages from "../components/ListMessages"
import FeedMessage from "../components/FeedMessage"

const Messages = () => {
    return (
        <div className="contentOverview">
            <div className="toolbar">
                <div className="container-fluid d-flex flex-stack flex-wrap flex-sm-nowrap">
                    <div className="d-flex flex-column align-items-start justify-content-center flex-wrap me-2"><div className="text-dark fw-bolder my-1 fs-2">Messages</div></div>
                    <div className="d-flex align-items-center flex-nowrap text-nowrap py-1"></div>
                </div>
                <div className="FiltreProduct"><select className="FiltreOption"><i></i>
                    <option>Filters</option>
                </select></div>
            </div>
            <div className="ContentView">
               <div className="FeedList"><ListMessages/></div>
               <div className="FeedMessage"><FeedMessage /></div>
            </div>
        </div>
    )
}

export default Messages
