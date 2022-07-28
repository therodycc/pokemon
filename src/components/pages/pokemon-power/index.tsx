import { NextPage } from 'next'
import React, { useEffect, useMemo, useState } from 'react'
interface PokemonPowerPropsI {
    pokemon: any
}
const PokemonPower: NextPage<PokemonPowerPropsI> = ({ pokemon }) => {
    const experienceLevel = useMemo(() => {
        if (pokemon?.base_experience < 100) return 'red';
        if (pokemon?.base_experience > 100 && pokemon?.base_experience < 200) return 'yellow';
        if (pokemon?.base_experience > 200) return '#31c231';
    }, [pokemon])

    return (
        <React.Fragment>
            <div className="present">
                <img src={pokemon?.sprites?.other?.dream_world?.front_default} />
                <div className="content-present">
                    <img src={pokemon?.sprites?.other?.dream_world?.front_default} alt="" />
                    <div className="info-poke">
                        <h1>{pokemon?.name?.toUpperCase()}</h1>
                        <p>Experience level</p>
                        <div className="poder">
                            <div
                                className="load"
                                style={{
                                    width: `${pokemon?.base_experience * 0.37}%`,
                                    backgroundColor: `${experienceLevel}`
                                }} />
                        </div>
                    </div>
                    <div className="results">
                        <div className="item-result">
                            <h3>{pokemon?.weight}</h3>
                            <span><i className="fas fa-weight" /></span>
                            <p>Weight</p>
                        </div>
                        <div className="item-result">
                            <h3>{pokemon?.game_indices?.[0]?.game_index}</h3>
                            <span><i className="fas fa-gamepad" /></span>
                            <p>Game</p>
                        </div>
                        <div className="item-result">
                            <h3>{pokemon?.height}</h3>
                            <span><i className="fas fa-ruler-vertical" /></span>
                            <p>height</p>
                        </div>
                        <div className="item-result">
                            <h3>{pokemon?.moves?.length}</h3>
                            <span><i className="fas fa-fire" /></span>
                            <p>Moves</p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default PokemonPower