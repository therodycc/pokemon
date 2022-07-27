import React, { useEffect, useState } from 'react'

const PokemonPower = () => {

    const [pokemon, setPokemon] = useState<any>(null);

    useEffect(() => {
        getTasks()
    }, []);

    let projects: any = []

    const getTasks = async () => {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${25}`);
        const res = await data.json();
        setPokemon(res)
    }

    const experienceLevel = (index: number) => {
        projects?.[index]?.base_experience < 100 && 'red';
        projects?.[index]?.base_experience > 100 && projects[index].base_experience < 200 && 'yellow';
        projects?.[index]?.base_experience > 200 && '#31c231';
    }

    return (
        <React.Fragment>
            <div className="present" key="index">
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
                                    backgroundColor: `${experienceLevel(1)}`
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