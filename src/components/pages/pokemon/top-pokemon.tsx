import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { SpecifyPokemonI } from "../../../interfaces/pokemon/pokemon.interface";
import pokemonProvider from "../../../providers/pokemon.provider";
import { TYPE_COLORS } from "../pokemon-power/type-chart";

// Mayores sumas de estadísticas base entre todas las formas (1125, 780, 780); el empate se resuelve por id.
const TOP_IDS = [10190, 10043, 10044];
const MAX_TOTAL = 1125;

interface TopEntry {
    id: number;
    name: string;
    total: number;
    image: string;
    color: string;
}

const toEntry = (pokemon: SpecifyPokemonI): TopEntry | null => {
    if (!pokemon || !Array.isArray(pokemon.stats)) return null;
    const other = pokemon.sprites?.other;
    return {
        id: pokemon.id,
        name: pokemon.name.replace(/-/g, " "),
        total: pokemon.stats.reduce((sum, { base_stat }) => sum + base_stat, 0),
        image:
            other?.["official-artwork"]?.front_default ||
            other?.dream_world?.front_default ||
            pokemon.sprites?.front_default ||
            "/assets/img/not_found.jpeg",
        color: TYPE_COLORS[pokemon.types?.[0]?.type.name] ?? "#7b241c",
    };
};

const TopPokemon: FC = () => {
    const router = useRouter();
    const [entries, setEntries] = useState<TopEntry[] | null>(null);

    useEffect(() => {
        let active = true;
        Promise.all(TOP_IDS.map((id) => pokemonProvider.getPokemon(String(id))))
            .then((results) => {
                if (!active) return;
                const valid = results.map(toEntry).filter((entry): entry is TopEntry => Boolean(entry));
                setEntries(valid.sort((a, b) => b.total - a.total));
            })
            .catch(() => active && setEntries([]));
        return () => {
            active = false;
        };
    }, []);

    if (entries !== null && entries.length === 0) return null;

    return (
        <section className="top-pokemon" aria-labelledby="top-pokemon-title">
            <h2 id="top-pokemon-title">Top 3 más poderosos</h2>
            <ol>
                {(entries ?? TOP_IDS.map(() => null)).map((entry, index) =>
                    entry ? (
                        <li key={entry.id}>
                            <button
                                type="button"
                                className="top-pokemon-card"
                                title={`${entry.name}: ${entry.total} puntos base`}
                                style={{ borderColor: entry.color }}
                                onClick={() => router.push(`/pokemon-power/${entry.name.replace(/ /g, "-")}`)}
                            >
                                <span className="top-pokemon-rank" style={{ background: entry.color }}>{index + 1}</span>
                                <img src={entry.image} alt="" />
                                <span className="top-pokemon-text">
                                    <strong>{entry.name}</strong>
                                    <small>{entry.total} pts</small>
                                    <span className="top-pokemon-track" aria-hidden="true">
                                        <span style={{ width: `${(entry.total / MAX_TOTAL) * 100}%`, background: entry.color }} />
                                    </span>
                                </span>
                            </button>
                        </li>
                    ) : (
                        <li key={index} className="top-pokemon-card top-pokemon-skeleton" aria-hidden="true" />
                    )
                )}
            </ol>
        </section>
    );
};

export default TopPokemon;
