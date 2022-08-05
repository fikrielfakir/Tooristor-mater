import React, {useEffect} from 'react'

import Sidebar from './Shared/sidebar/Sidebar'
import TopNav from './Shared/topnav/TopNav'
import Routes from './Routes'
import '../dashbord/index.css'
import '../dashbord/style.bundle.css'
import '../dashbord/font-awsome/style.css'

import { BrowserRouter, Route } from 'react-router-dom'
const DASHBORD_ADMIN = () => {
    return (
        <BrowserRouter>
            <Route render={(props) => (
                <body className="header-fixed header-tablet-and-mobile-fixed toolbar-enabled aside-fixed aside-default-enabled">
                   <div className="d-flex flex-column flex-root">
                    <div className="page d-flex flex-row flex-column-fluid">
                    <div className="SideFlex">
                    <Sidebar {...props}/>
                        <div className="wrapper d-flex flex-column flex-row-fluid">
                            <TopNav/>
                            <Routes/>
                        </div>
                    </div>
                    </div>
                    </div>
                </body>
            )}/>
        </BrowserRouter>
    )
}

export default DASHBORD_ADMIN
