import React, {useRef, useState, useEffect} from 'react'

import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import './sidebar.css'

import logo from './logo.png'

// import sidebar_items from './assets/JsonData/sidebar_routes_en.json'


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
    const { t } = useTranslation();

const sidebar_items = [
    { 
        "display_name": t("overview"),
        "route": "/admin",
        "head": "Overview",
        "icon": "fas fa-th-large",
        "value":"1"
    },
    {
        "display_name": t("projects"),
        "route": "/admin/projects",
        "head": "Projcts",
        "icon": "icon-Vector-21",
        "value":"2"
    },
    {
        "display_name": t("products"),
        "route": "/admin/products",
        "head": "Products",
        "icon": "far fa-box-usd",
        "value":"2"
    },
    {
        "display_name": t("Category"),
        "route": "/admin/category",
        "head": "Category",
        "icon": "fad fa-puzzle-piece",
        "value":"2"
    },
    {
        "display_name": t("offres"),
        "route": "/admin/offres",
        "head": "Category",
        "icon": "fad fa-percentage",
        "value":"2"
    },
    {
        "display_name": t("tags"),
        "route": "/admin/tags",
        "head": "Category",
        "icon": "fad fa-tags",
        "value":"2"
    },
    {
        "display_name": t("messages"),
        "route": "/admin/messages",
        "head": "Messages",
        "icon": "fad fa-envelope",
        "value":"2"
    },
    {
        "display_name": t("settings"),
        "route": "/admin/settings",
        "head": "Settings",
        "icon": "fad fa-cog",
        "value":"2"
    }
]

    const activeItem = sidebar_items.findIndex(item => item.route === props.location?.pathname)

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
