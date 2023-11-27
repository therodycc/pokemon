import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../../root-reducer';

const pokemonsState = (state: AppState) => state.pokemons;

const getPokemons = createSelector(pokemonsState, state => state.results);
const getPokemonsCount = createSelector(pokemonsState, state => state.count);

export const pokemonsSelector = {
    getPokemons,
    getPokemonsCount
};