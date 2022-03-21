import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'


import routes from '../routes'

export function Navigation() {


    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav className='main-container full'>
            <div className={`${isMenuOpen ? 'open' : ''} main-screen`} onClick={toggleMenu}></div>
            <div className="wrraper flex space-between align-center">
                <div className="burger flex column" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div className='logo-container'>
                    <span>Logo Here</span>
                </div>
                <ul className={`${isMenuOpen ? 'open' : ''} clean-list flex justify-center align-center`}>
                    {routes.map(route => <li key={route.path}><NavLink to={route.path} onClick={toggleMenu}>{route.label}</NavLink></li>)}
                </ul>
            </div>
        </nav>
    );
}
