import React from "react"
import ListMessages from "../../components/ListMessages"
import FeedProjects from "../../components/FeedProjects"
import { Link} from 'react-router-dom';

const Projects = () => {
    return (
        <div className="content fs-6 d-flex flex-column flex-column-fluid">
            <div className="toolbar">
                <div className="container-fluid d-flex flex-stack flex-wrap flex-sm-nowrap">
                <div className="d-flex align-items-start flex-wrap me-2 headAdd"><div className="text-dark fw-bolder my-1 fs-2">Projects</div><Link to="/admin/projects/add"><button className="addNew" >Add new</button></Link></div>
                    <div className="d-flex align-items-center flex-nowrap text-nowrap py-1"></div>
                </div>
                <div className="FiltreProduct"><select className="FiltreOption"><i></i>
                    <option>Filters</option>
                </select></div>
            </div>
            <div className="ContentView">
               <div className="FeedList"><ListMessages/></div>
               <div className="FeedProjects"><FeedProjects /></div>
            </div>
        </div>
    )
}

export default Projects