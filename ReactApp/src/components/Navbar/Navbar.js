import React from "react";
import {Link, NavLink} from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
    return(
        <div className="header-container">
            <header>
                <h1><Link to={'/'}>Note Taker</Link></h1>
                <nav>
                    <ul>
                        <li><NavLink to={'/notes'}>Notes</NavLink></li>
                        <li><NavLink to={'/about'}>About</NavLink></li>
                    </ul>
                </nav>
            </header>
        </div>
    )
};

export default Navbar;