import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { PokemonListPropsI } from '../../../interfaces/pokemon/pokemon.interface'
import { getPokemons } from '../../../redux/slices/pokemons/pokemons.actions'
import { pokemonsSelector } from '../../../redux/slices/pokemons/pokemons.selector'
import { useDispatch, useSelector } from '../../../redux/store'
import PokemonCard from '../../common/card/pokemon-card'
import { Pagination } from '../../common/pagination'

const PokemonList: FC<PokemonListPropsI> = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const pokemons = useSelector(pokemonsSelector.getPokemons)
    const count = useSelector(pokemonsSelector.getPokemonsCount)
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        dispatch(getPokemons({ limit: 12, offset: page }))
    }, [dispatch, page]);

    return (
        <React.Fragment>
            <div className="container row justify-content-center" style={{ margin: 'auto' }}>
                <div className='d-flex justify-content-end'>
                    <Pagination setPage={setPage} page={page} />
                </div>
                {pokemons?.map((pokemon) => (
                    <PokemonCard
                        onClick={() => router.push(`/pokemon-power/${pokemon.name}`)}
                        key={pokemon.name + "-key"}
                        name={pokemon?.name}
                        img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${getImagePokemon(pokemon?.url)}.svg`}
                    />
                ))}
            </div>
        </React.Fragment>
    )
}

const getImagePokemon = (url: string) => {
    let range = url.split('/').length - 2;
    return url.split('/')[range];
}

export default PokemonList