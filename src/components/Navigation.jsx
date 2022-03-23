import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'


import routes from '../routes'
import { changeMode } from '../store/actions/weather.action';

export function Navigation() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const { isDarkMode } = useSelector(state => state.weatherModule)
    const dispatch = useDispatch()


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }


    const onChangeMode = () => {
        dispatch(changeMode())
    }


    return (
        <nav className={`${isDarkMode ? 'dark' : ''} main-container full`}>
            <div className={`${isMenuOpen ? 'open' : ''} main-screen`} onClick={toggleMenu}></div>
            <div className="wrraper flex space-between align-center">
                <div className="burger flex column" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <Link to={'/'}>
                    <div className='logo-container'>
                        <span>Logo Here</span>
                    </div>
                </Link>
                <ul className={`${isMenuOpen ? 'open' : ''} clean-list flex justify-center align-center`}>
                    {routes.map(route => <li key={route.path}><NavLink to={route.path} onClick={toggleMenu}>{route.label}</NavLink></li>)}
                    <button onClick={onChangeMode}>{isDarkMode ? '☀' : '🌑'}</button>
                </ul>
            </div>
        </nav>
    );
}
