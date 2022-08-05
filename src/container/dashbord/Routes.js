import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Overview from './pages/Overview'
import Products from './pages/Products'
import Messages from './pages/Messages'
import Settings from './pages/Settings'


const Routes = () => {
    return (
        <Switch>
            <Route path='/admin-owner' exact component={Overview}/>
            <Route path='/admin-owner/products' exact component={Products}/>
            <Route path='/admin-owner/messages' exact component={Messages}/>
            <Route path='/admin-owner/settings' exact component={Settings}/>

            
        </Switch>
    )
}

export default Routes
