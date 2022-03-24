import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'

import routes from '../routes'

// Actions
import { changeMode } from '../store/actions/weather.action';


// Imgs
import light from '../assets/img/Light.svg'
import dark from '../assets/img/Dark.svg'


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
                        <span>My Weather App</span>
                    </div>
                </Link>
                <ul className={`${isMenuOpen ? 'open' : ''} clean-list flex justify-center align-center`}>
                    {routes.map(route => <li key={route.path}><NavLink to={route.path} onClick={toggleMenu}>{route.label}</NavLink></li>)}
                        <img src={isDarkMode ? light : dark} onClick={onChangeMode} alt={isDarkMode ? 'Light mode' : 'Dark mode'} />
                </ul>
            </div>
        </nav>
    );
}
