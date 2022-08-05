import Dashboard from "./pages/Overview";
import Products from './pages/Products';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import { React } from 'react';



export const OwnerAdminData = [
    {   
        title:"Dashboard",
        path:"Dashboard",
        element:<Dashboard/>
    },
    {   
        title:"Products",
        path:"Products",
        element:<Products/>
    },
    {   
        title:"Messages",
        path:"Messages",
        element:<Messages/>
    },
    {   
        title:"Settings",
        path:"Settings",
        element:<Settings/>
    },
];