import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Overview from './pages/Overview'
import Projects from './pages/Projects'
import AddProject from './pages/Projects/AddProject'
import Products from './pages/Products'
import AddProduct from './pages/Products/AddProduct'
import Category from './pages/Category'
import AddCategory from './pages/Category/AddCategory'
import Messages from './pages/Messages'
import Settings from './pages/Settings'
import NotFoundPage from '../../container/404/404'


const Routes = () => {
    return (
        <Switch>
            <Route path='/admin' exact component={Overview}/>
            <Route path='/admin/projects' exact component={Projects}/>
            <Route path='/admin/projects/add' exact component={AddProject}/>
            <Route path='/admin/products' exact component={Products}/>
            <Route path='/admin/products/add' exact component={AddProduct}/>
            <Route path='/admin/category' exact component={Category}/>
            <Route path='/admin/category/add' exact component={AddCategory}/>
            <Route path='/admin/messages' exact component={Messages}/>
            <Route path='/admin/settings' exact component={Settings}/>
            <Route path='/admin/*' component={NotFoundPage} />
        </Switch>
    )
}

export default Routes
