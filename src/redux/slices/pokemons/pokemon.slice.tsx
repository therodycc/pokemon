import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PokemonI } from '../../../interfaces/pokemon/pokemon.interface';

interface IPokemonState extends PokemonI {

}

const initialState: IPokemonState = {
    count: 0,
    next: '',
    previous: '',
    results: []
};

const pokemonSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        setPokemonState(state: IPokemonState, action: PayloadAction<IPokemonState>) {
            return {
                ...state,
                ...action.payload
            };
        },
        resetPokemonState() {
            return initialState;
        }
    }
});

export default pokemonSlice.reducer;
export const { setPokemonState, resetPokemonState } = pokemonSlice.actions;
