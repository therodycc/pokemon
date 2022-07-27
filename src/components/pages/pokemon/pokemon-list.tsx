import React, { FC } from 'react'
import PokemonCard from '../../card/pokemon-card'

interface PokemonListPropsI {
    pokemonArray: any
}
const PokemonList: FC<PokemonListPropsI> = ({ pokemonArray }) => {

    const getImagePokemon = (url: string) => {
        let range = url.split('/').length - 2;
        return url.split('/')[range];
    }

    return (
        <React.Fragment>
            <div className="container mt-5 m-auto row justify-content-center" >
                {pokemonArray?.map((pokemon: any) => (
                    <PokemonCard
                        key={pokemon.name + "-key"}
                        name={pokemon?.name}
                        img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${getImagePokemon(pokemon?.url)}.svg`}
                    />
                ))}
            </div>
        </React.Fragment>
    )
}

export default PokemonList