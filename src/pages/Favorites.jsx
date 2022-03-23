import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FavList } from '../components/FavList';


export function Favorites() {

  const { favLocations } = useSelector(state => state.favoritesModule)

  return (
    <section className='favorites'>
      <h1>Your favorites location weather</h1>
      {favLocations &&<FavList favLocations={favLocations} />}
    </section>
  );
}
