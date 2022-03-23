import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router'
import { useDispatch } from 'react-redux';
import routes from './routes'


// Components
import { Footer } from './components/Footer';
import { Navigation } from './components/Navigation';
import { UserMsg } from './components/UserMsg';

// Actions
import { query } from './store/actions/favorites.action';



export function RootCmp() {

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(query())
  }, [])

  
  return (
    <section className="App main-container">
      <header className='main-container full'>
        <Navigation />
      </header>
      <main>
        <Routes>
          {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
        </Routes>
      </main>
      <Footer />
      <UserMsg />
    </section>
  );
}