import React from 'react'
import { ME } from "./../../../../components/GraphQL/me.graphql"
import { useQuery, useMutation } from "@apollo/client";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Sidebar from './../sidebar/Sidebar';
import { Button, Dropdown, Menu, Space } from 'antd';
import { useHistory } from 'react-router-dom';


import './topnav.css'
import { Link } from 'react-router-dom'

// import Dropdown from './dropdown/Dropdown'
import useWindowSize from 'library/hooks/useWindowSize';

// import user_menu from './assets/JsonData/user_menus.json'
// import notifications from './assets/JsonData/notification.json'

import { Drawer } from 'rsuite';
// import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
// import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
// import AngleDownIcon from '@rsuite/icons/legacy/AngleDown';
// import AngleUpIcon from '@rsuite/icons/legacy/AngleUp';
import Langue from './../../../Layout/Header/Langue';
import { LOGOUT } from 'components/GraphQL/auth.graphql';
import Auth from 'container/Auth/utils/auth';

const Topnav = (props) => {
    const history = useHistory()

    // const [logout, { loading }] = useMutation(LOGOUT);
    const [logout] = useMutation(LOGOUT)

    const Onlogout = async (event) => {
        event.preventDefault();
        try {
            const Logout = await logout()
            localStorage.removeItem('id_token');
            localStorage.removeItem('permissions');
            window.location.assign('/sign-in');
        }
        catch (e) {
            console.log(e);

        }
    };
    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <a rel="noopener noreferrer">
                            Profile
                        </a>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <a onClick={Onlogout}>
                            logout
                        </a>
                    ),
                }
            ]}
        />
    );



    const handle = useFullScreenHandle();

    const { width } = useWindowSize();
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();

    const handleOpen = key => {
        setOpen(true);
        setPlacement(key);
    };

    const { loading: LoadingMe, error: ErrorMe, data: DataMe } = useQuery(ME);
    if (ErrorMe) return ("error")

    const renderUserToggle = (user) => (
        <div className="topnav__right-user">
            {LoadingMe ? (<div className="Loading"></div>) : (
                <div className="topnav__right-user__name">
                    {DataMe.me.name}
                </div>
            )}
        </div>
    )
    console.log("logout", logout)
    return (
        <>
            <div className='Onlyheader'>
                {width > 991 ? (
                    <>
                        {props.handle.active ?
                            <a onClick={props.handle.exit}><i class="fad fa-compress-arrows-alt"></i></a> : <a onClick={props.handle.enter}><i class="fad fa-expand-arrows"></i></a>
                        }
                    </>
                ) : (<a onClick={() => handleOpen('left')}><i class="fas fa-bars"></i></a>)
                }

                {/*  */}
                {/* <div className="topnav__search">
           
                <input type="text" placeholder='Search here...' />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.75 11C2.75 6.44365 6.44365 2.75 11 2.75C15.5563 2.75 19.25 6.44365 19.25 11C19.25 15.5563 15.5563 19.25 11 19.25C6.44365 19.25 2.75 15.5563 2.75 11Z" stroke="#353B48" stroke-opacity="0.2" stroke-width="1.5" />
                    <path d="M18.75 20C18.75 19.3096 19.3096 18.75 20 18.75C20.6904 18.75 21.25 19.3096 21.25 20C21.25 20.6904 20.6904 21.25 20 21.25C19.3096 21.25 18.75 20.6904 18.75 20Z" stroke="#353B48" stroke-opacity="0.2" stroke-width="1.5" />
                </svg>

            </div> */}
                <div className="topnav__right">
                    <div className="topnav__right-item">
                        <Langue />
                        {/* <Dropdown
                            icon='icon-Vector-23'
                            badge='12'
                            contentData={notifications}
                            renderItems={(item, index) => renderNotificationItem(item, index)}
                            renderFooter={() => <Link to='/'>View All</Link>}
                        /> */}
                        {/* dropdown here */}

                    </div>

                    <div className="topnav__right-item">
                        {/* dropdown here */}

                        {/* <Dropdown
                            customToggle={() => renderUserToggle(curr_user)}
                            contentData={user_menu}
                            icon='icon-uniE906'
                            renderItems={(item, index) => renderUserMenu(item, index)}
                        /> */}

                        <Space direction="vertical">
                            <Space wrap>
                                <Dropdown overlay={menu} placement="bottomLeft">
                                    <span><img src={DataMe?.me?.profile?.original ? (DataMe?.me?.profile?.original) : ("/images/profile.png")} /> {DataMe?.me.name} {DataMe?.me.lastname}</span>
                                </Dropdown>
                            </Space>
                        </Space>
                    </div>

                </div>
            </div>

            <>
                <Drawer size="xs" placement={placement} open={open} onClose={() => setOpen(false)}>

                    <Drawer.Body>
                        <Sidebar {...props} />
                    </Drawer.Body>
                </Drawer>

            </>
        </>
    )

}

export default Topnav
