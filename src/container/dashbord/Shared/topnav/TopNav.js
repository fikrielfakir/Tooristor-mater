import React from 'react'

import './topnav.css'
import { Link } from 'react-router-dom'

import Dropdown from './dropdown/Dropdown'

import user_menu from './assets/JsonData/user_menus.json'
import notifications from './assets/JsonData/notification.json'
const curr_user = {
    display_name: 'Pharmacy Errahma',
}

const renderNotificationItem = (item, index) => (
    <div className="notification-item" key={index}>
        <i className={item.icon}></i>
        <span>{item.content}</span>
    </div>
)

const renderUserToggle = (user) => (
    <div className="topnav__right-user">
       
        <div className="topnav__right-user__name">
            {user.display_name}
        </div>
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
    return (
        <div className='container-fluid d-flex align-items-stretch justify-content-start'>
            <div className="topnav__search">
                <input type="text" placeholder='Search here...' />
  

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
