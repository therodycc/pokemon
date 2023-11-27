import pokemonProvider from "../../../providers/pokemon.provider"
import { setPokemonState } from "./pokemon.slice"

export const getPokemons = (params: { limit: number, offset: number }) => {
    return async (dispatch: any) => {
        const data = await pokemonProvider.getPokemonList(params)
        dispatch(setPokemonState({
            ...data
        }))
    }
}