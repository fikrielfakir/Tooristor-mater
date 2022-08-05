import React from "react"
import Card from "../components/UI DASHBORD/Card"
import ListMessages from "../components/ListMessages"
import ListProducts from "../components/ListProducts"

const Overview = () => {
    return (
        <div className="content fs-6 d-flex flex-column flex-column-fluid">
            <div className="toolbar">
                <div className="container-fluid d-flex flex-stack flex-wrap flex-sm-nowrap">
                    <div className="d-flex flex-column align-items-start justify-content-center flex-wrap me-2"><div className="text-dark fw-bolder my-1 fs-2">Dashboard Overview</div></div>
                    <div className="d-flex align-items-center flex-nowrap text-nowrap py-1">Dashboard Overview</div>
                </div>
            </div>
            <div className="post fs-6 d-flex flex-column-fluid">
                <div className="listCard">
                <Card
                color="green"
                icon="icon-Vector-19"
                view="233"
                name="Visitors"
                />
                <Card
                color="bleue"
                icon="icon-Vector-20"
                view="898"
                name="Calls"
                />
                <Card
                color="violet"
                icon="icon-Vector-21"
                view="233"
                name="Visitors"
                />
                <Card
                color="red"
                icon="icon-Vector-22"
                view="233"
                name="Visitors"
                />
                </div>
            </div>
            <div className="ContentView">
               <div className="FeedList"><ListMessages Title="Projects"/></div>
               <div className="FeedList"><ListProducts Title="Products"/></div>
            </div>
        </div>
    )
}

export default Overview
