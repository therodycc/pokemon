/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import { useMemo } from "react";
import {
    PokemonPowerPropsI,
    SpecifyPokemonI,
} from "../../../interfaces/pokemon/pokemon.interface";

const PokemonPower: NextPage<PokemonPowerPropsI> = ({ pokemon }) => {
    const experienceLevel = useMemo(() => {
        return pokemon?.base_experience < 100
            ? "red"
            : pokemon?.base_experience > 100 && pokemon?.base_experience < 200
                ? "yellow"
                : "green";
    }, [pokemon]);

    const pokemonImage = useMemo(
        () => pokemon?.sprites?.other?.dream_world?.front_default,
        [pokemon?.sprites?.other?.dream_world?.front_default]
    );

    return (
        <div>
            <div className="present">
                <img src={pokemonImage} alt="" />
                <div className="content-present">
                    {pokemonImage ? (
                        <img src={pokemonImage} alt="" />
                    ) : (
                        <img src={"/assets/img/not_found.jpeg"} alt="" />
                    )}
                    <div className="info-poke">
                        <h1>{pokemon?.name?.toUpperCase()}</h1>
                        <p>Experience level</p>
                        <div className="poder">
                            <div
                                className="load"
                                style={{
                                    width: `${pokemon?.base_experience * 0.37}%`,
                                    backgroundColor: `${experienceLevel}`,
                                }}
                            />
                        </div>
                    </div>
                    <div className="results">
                        {getDetails(pokemon).map((item) => (
                            <div key={item.name} className="item-result">
                                <h3>{item.info}</h3>
                                <span>
                                    <i className={item.icon} />
                                </span>
                                <p>{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const getDetails = (pokemon: SpecifyPokemonI) => [
    {
        info: pokemon?.weight || 0,
        icon: "fas fa-weight",
        name: "Weight",
    },
    {
        info: pokemon?.game_indices?.[0]?.game_index || 0,
        icon: "fas fa-gamepad",
        name: "Game",
    },
    {
        info: pokemon?.height || 0,
        icon: "fas fa-ruler-vertical",
        name: "Height",
    },
    {
        info: pokemon?.moves?.length || 0,
        icon: "fas fa-fire",
        name: "Moves",
    },
];

export default PokemonPower;
