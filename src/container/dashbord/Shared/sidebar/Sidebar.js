import React, {useRef, useState, useEffect} from 'react'

import { Link } from 'react-router-dom'

import './sidebar.css'

import logo from './logo.png'

import sidebar_items from './assets/JsonData/sidebar_routes.json'

const SidebarItem = props => {
    const [selectedOption, setSelectedOption] = useState();
    const selectChange = e => {
        const value = e.target.value;
        setSelectedOption(value);
      };
    const active = props.active ? 'active' : ''

    return (
       
            <li className={`sidebar__item-inner ${active}`} value="fik">
                <i className={props.icon}></i>
                <span className="head">
                    {props.title}
                </span>
            </li>
    )
}

const Sidebar = props => {

    const activeItem = sidebar_items.findIndex(item => item.route === props.location.pathname)

    return (
        <div className='aside aside-default aside-hoverable'>
            <div className="aside-logo flex-column-auto pt-9 pb-5">
               <a href="/dashbord-owner"> <img src={logo} alt="company logo" /></a>
            </div>
            <div className='item_sidebar'>
            {
                sidebar_items.map((item, index) => (
                    <Link to={item.route} key={index}>
                        <SidebarItem
                            title={item.display_name}
                            icon={item.icon}
                            active={index === activeItem}
                        />
                    </Link>
                ))
            }
            </div>
        </div>
    )
}

export default Sidebar
