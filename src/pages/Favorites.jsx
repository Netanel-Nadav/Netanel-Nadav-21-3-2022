import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { query } from '../store/actions/favorites.action';


export function Favorites() {

  const { favLocations } = useSelector(state => state.favoritesModule)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(query())
  }, [])


  console.log(favLocations);
  return (
    <section className='favorites'>
      <h1>Your favorites location weather</h1>
    </section>
  );
}
