import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { PokemonListPropsI } from '../../../interfaces/pokemon/pokemon.interface'
import PokemonCard from '../../common/card/pokemon-card'

const PokemonList: FC<PokemonListPropsI> = ({ pokemonArray }) => {
    const router = useRouter()

    const getImagePokemon = (url: string) => {
        let range = url.split('/').length - 2;
        return url.split('/')[range];
    }

    return (
        <React.Fragment>
            <div className="container mt-5 m-auto row justify-content-center" >
                {pokemonArray?.map((pokemon) => (
                    <PokemonCard
                        onClick={() => { router.push(`/pokemon-power/${pokemon.name}`) }}
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