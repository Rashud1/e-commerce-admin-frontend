import React from 'react'
import { Link } from "react-router-dom";
import "./side-bar-menu.style.css"


export const SideBarMenu = () => {
    return (
        <div className="side-bar-menu">
            <Link to="/dashboard" className="logo">Admin log
            </Link>
            <hr style={{ border: "1px solid white"}} />
            
        <div className="menu-list">
           <ul>
            <li>
                <Link className="menu-item" to="/dashboard">Dashboard</Link>
            </li>
            <li><Link className="menu-item" to="/category">Categories</Link></li>
            <li><Link className="menu-item" to="/products">Products</Link></li>
            <li><Link className="menu-item" to="/orders">Orders</Link></li>
            <li><Link className="menu-item" to="/customers">Customers</Link></li>
            <li><Link className="menu-item" to="/payments">Payments</Link></li>
            <hr style={{ border: "1px solid white"}} />
            <li><Link className="menu-item" to="/registration">Admin User</Link></li>
           </ul>
         </div>
         </div>
        
    );
};

export default SideBarMenu;
