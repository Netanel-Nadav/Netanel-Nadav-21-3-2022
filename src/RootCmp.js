import React from 'react';


import { Routes, Route } from 'react-router'
import { Footer } from './components/Footer';
import { Navigation } from './components/Navigation';
import { UserMsg } from './components/UserMsg';
import routes from './routes'

export function RootCmp() {

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