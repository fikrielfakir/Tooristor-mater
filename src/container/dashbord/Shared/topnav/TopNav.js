import React from 'react'
import {ME} from "./../../../../components/GraphQL/me.graphql"
import { useQuery, useMutation} from "@apollo/client";


import './topnav.css'
import { Link } from 'react-router-dom'

import Dropdown from './dropdown/Dropdown'

import user_menu from './assets/JsonData/user_menus.json'
import notifications from './assets/JsonData/notification.json'
const curr_user = {display_name: 'Pharmacy Errahma'}

const renderNotificationItem = (item, index) => (
    
    <div className="notification-item" key={index}>
        <i className={item.icon}></i>
        <span>{item.content}</span>
    </div>
)



const renderUserMenu =(item, index) => (
    <Link to='/' key={index}>
        <div className="notification-item">
            <i className={item.icon}></i>
            <span>{item.content}</span>
        </div>
    </Link>
)


const Topnav = () => {

    const { loading: LoadingMe, error: ErrorMe, data: DataMe } = useQuery(ME);
if (ErrorMe) return ("error")

    const renderUserToggle = (user) => (
        <div className="topnav__right-user">
           { LoadingMe ? (<div className="Loading"></div>) :(
            <div className="topnav__right-user__name">
               {DataMe.me.name}
            </div>
           )}
        </div>
    )

    return (
        <div className='container-fluid d-flex align-items-stretch justify-content-start'>
            <div className="topnav__search">
                <input type="text" placeholder='Search here...' />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.75 11C2.75 6.44365 6.44365 2.75 11 2.75C15.5563 2.75 19.25 6.44365 19.25 11C19.25 15.5563 15.5563 19.25 11 19.25C6.44365 19.25 2.75 15.5563 2.75 11Z" stroke="#353B48" stroke-opacity="0.2" stroke-width="1.5"/>
<path d="M18.75 20C18.75 19.3096 19.3096 18.75 20 18.75C20.6904 18.75 21.25 19.3096 21.25 20C21.25 20.6904 20.6904 21.25 20 21.25C19.3096 21.25 18.75 20.6904 18.75 20Z" stroke="#353B48" stroke-opacity="0.2" stroke-width="1.5"/>
</svg>

            </div>
            <div className="topnav__right">
                <div className="topnav__right-item">
                <Dropdown
                        icon='icon-Vector-23'
                        badge='12'
                        contentData={notifications}
                        renderItems={(item, index) => renderNotificationItem(item, index)}
                        renderFooter={() => <Link to='/'>View All</Link>}
                    />
                    {/* dropdown here */}
                </div>
                <div className="topnav__right-item">
                    {/* dropdown here */}
                    <Dropdown
                        customToggle={() => renderUserToggle(curr_user)}
                        contentData={user_menu}
                        icon='icon-uniE906'
                        renderItems={(item, index) => renderUserMenu(item, index)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Topnav
