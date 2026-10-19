import { FC, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PokemonPowerPropsI } from "../../../interfaces/pokemon/pokemon.interface";
import {
    TYPE_COLORS,
    TYPE_NAMES_ES,
    getDefensiveMultipliers,
} from "./type-chart";

const MAX_BASE_STAT = 255;
const MAX_POKEDEX_ID = 1025;
const FALLBACK_IMAGE = "/assets/img/not_found.jpeg";

const COMBAT_STATS = [
    { key: "hp", label: "PS" },
    { key: "attack", label: "Ataque" },
    { key: "defense", label: "Defensa" },
    { key: "special-attack", label: "Ataque especial" },
    { key: "special-defense", label: "Defensa especial" },
    { key: "speed", label: "Velocidad" },
];

const formatMultiplier = (value: number) =>
    value === 0.25 ? "¼" : value === 0.5 ? "½" : String(value);

const typeLabel = (type: string) => TYPE_NAMES_ES[type] ?? type;

const PokemonPower: FC<PokemonPowerPropsI> = ({ pokemon }) => {
    const sources = useMemo(() => {
        const other = pokemon?.sprites?.other;
        return [
            other?.["official-artwork"]?.front_default,
            other?.dream_world?.front_default,
            pokemon?.sprites?.front_default,
        ].filter((src): src is string => Boolean(src));
    }, [pokemon]);
    const [sourceIndex, setSourceIndex] = useState(0);

    useEffect(() => setSourceIndex(0), [pokemon?.id]);

    const typeNames = useMemo(
        () => Array.from(new Set((pokemon?.types ?? []).map(({ type }) => type.name))),
        [pokemon]
    );

    const stats = useMemo(
        () =>
            COMBAT_STATS.map(({ key, label }) => ({
                key,
                label,
                value:
                    pokemon?.stats?.find(({ stat }) => stat.name === key)?.base_stat ?? 0,
            })),
        [pokemon]
    );

    const effectiveness = useMemo(() => {
        const multipliers = getDefensiveMultipliers(typeNames);
        const group = (predicate: (value: number) => boolean) =>
            Object.entries(multipliers)
                .filter(([, value]) => predicate(value))
                .sort(([, a], [, b]) => b - a);
        return {
            weaknesses: group((value) => value > 1),
            resistances: group((value) => value > 0 && value < 1).sort(
                ([, a], [, b]) => a - b
            ),
            immunities: group((value) => value === 0),
        };
    }, [typeNames]);

    if (!pokemon || !pokemon.stats || typeNames.length === 0) {
        return (
            <main className="pokemon-detail">
                <p className="pokemon-detail-empty" role="alert">
                    No se pudo cargar la información de este Pokémon.
                </p>
            </main>
        );
    }

    const total = stats.reduce((sum, { value }) => sum + value, 0);
    const mainColor = TYPE_COLORS[typeNames[0]] ?? "#7b241c";
    const secondColor = TYPE_COLORS[typeNames[1]] ?? mainColor;
    const imageSrc = sources[sourceIndex] ?? FALLBACK_IMAGE;
    const name = pokemon.name.replace(/-/g, " ");

    const [hp, attack, defense, spAttack, spDefense, speed] = stats.map(
        ({ value }) => value
    );
    const best = stats.reduce((a, b) => (b.value > a.value ? b : a));
    const offense = Math.max(attack, spAttack);
    const bulk = (hp + defense + spDefense) / 3;
    const profiles = [
        { label: "ofensivo", value: offense },
        { label: "defensivo", value: bulk },
        { label: "rápido", value: speed },
    ];
    const sortedProfiles = [...profiles].sort((a, b) => b.value - a.value);
    const profile =
        sortedProfiles[0].value - sortedProfiles[2].value < 20
            ? "equilibrado"
            : sortedProfiles[0].label;
    const rulerItems = [
        { label: "Weight", value: pokemon.weight, hint: `${(pokemon.weight / 10).toFixed(1)} kg` },
        { label: "Game", value: pokemon.game_indices?.length ?? 0, hint: "versiones" },
        { label: "Height", value: pokemon.height, hint: `${(pokemon.height / 10).toFixed(1)} m` },
        { label: "Moves", value: pokemon.moves?.length ?? 0, hint: "movimientos" },
    ];
    const topWeaknessValue = effectiveness.weaknesses[0]?.[1];
    const topWeaknesses = effectiveness.weaknesses
        .filter(([, value]) => value === topWeaknessValue)
        .map(([type]) => typeLabel(type));

    return (
        <main className="pokemon-detail">
            <section
                className="pokemon-hero"
                style={{
                    background: `linear-gradient(135deg, ${mainColor}33 0%, ${secondColor}22 100%)`,
                }}
            >
                <nav className="pokemon-hero-nav" aria-label="Navegación entre Pokémon">
                    {pokemon.id > 1 && pokemon.id <= MAX_POKEDEX_ID ? (
                        <Link href={`/pokemon-power/${pokemon.id - 1}`}>
                            <a aria-label="Pokémon anterior">‹ N.º {String(pokemon.id - 1).padStart(3, "0")}</a>
                        </Link>
                    ) : (
                        <span />
                    )}
                    {pokemon.id < MAX_POKEDEX_ID && (
                        <Link href={`/pokemon-power/${pokemon.id + 1}`}>
                            <a aria-label="Pokémon siguiente">N.º {String(pokemon.id + 1).padStart(3, "0")} ›</a>
                        </Link>
                    )}
                </nav>
                <img
                    className="pokemon-hero-image"
                    src={imageSrc}
                    alt={`Ilustración de ${name}`}
                    onError={() => {
                        if (sourceIndex < sources.length) setSourceIndex(sourceIndex + 1);
                    }}
                />
                <div className="pokemon-hero-info">
                    <span className="pokemon-hero-number">
                        N.º {String(pokemon.id).padStart(3, "0")}
                    </span>
                    <h1>{name}</h1>
                    <div className="pokemon-hero-types">
                        {typeNames.map((type) => (
                            <span
                                key={type}
                                className="pokemon-type-chip"
                                style={{ background: TYPE_COLORS[type] ?? "#7b241c" }}
                            >
                                {typeLabel(type)}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            <section className="pokemon-ruler" aria-label="Medidas del Pokémon">
                <ul>
                    {rulerItems.map(({ label, value, hint }) => (
                        <li key={label}>
                            <strong>{value}</strong>
                            <span>{label}</span>
                            <small>{hint}</small>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="pokemon-panel pokemon-stats" aria-labelledby="stats-title">
                <div className="pokemon-panel-header">
                    <h2 id="stats-title">Estadísticas de combate</h2>
                    <span className="pokemon-total">
                        Total <strong>{total}</strong>
                    </span>
                </div>
                <ul className="pokemon-stat-list">
                    {stats.map(({ key, label, value }) => (
                        <li key={key} className="pokemon-stat-row">
                            <span className="pokemon-stat-label">{label}</span>
                            <strong className="pokemon-stat-value">{value}</strong>
                            <div
                                className="pokemon-stat-track"
                                role="progressbar"
                                aria-label={`${label}, ${value} de ${MAX_BASE_STAT}`}
                                aria-valuemin={0}
                                aria-valuemax={MAX_BASE_STAT}
                                aria-valuenow={value}
                            >
                                <span
                                    className="pokemon-stat-fill"
                                    style={{
                                        width: `${Math.min((value / MAX_BASE_STAT) * 100, 100)}%`,
                                        background: mainColor,
                                    }}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="pokemon-panel pokemon-types" aria-labelledby="types-title">
                <h2 id="types-title">Efectividad de tipos</h2>
                <EffectivenessGroup
                    title="Debilidades"
                    entries={effectiveness.weaknesses}
                    empty="Sin debilidades."
                    tone="weak"
                />
                <EffectivenessGroup
                    title="Resistencias"
                    entries={effectiveness.resistances}
                    empty="Sin resistencias."
                    tone="resist"
                />
                <EffectivenessGroup
                    title="Inmunidades"
                    entries={effectiveness.immunities}
                    empty="Sin inmunidades."
                    tone="immune"
                />
            </section>

            <section className="pokemon-panel pokemon-summary" aria-labelledby="summary-title">
                <h2 id="summary-title">Evaluación resumida</h2>
                <ul>
                    <li>
                        <span>Fortaleza principal</span>
                        <strong>
                            {best.label} ({best.value})
                        </strong>
                    </li>
                    <li>
                        <span>Debilidad más importante</span>
                        <strong>
                            {topWeaknesses.length > 0
                                ? `${topWeaknesses.join(", ")} ×${formatMultiplier(topWeaknessValue ?? 0)}`
                                : "Ninguna"}
                        </strong>
                    </li>
                    <li>
                        <span>Perfil general</span>
                        <strong>{profile}</strong>
                    </li>
                </ul>
                <p>
                    Lectura orientativa basada en las estadísticas base y los tipos; no es un
                    ranking competitivo oficial.
                </p>
            </section>
        </main>
    );
};

const EffectivenessGroup: FC<{
    title: string;
    entries: [string, number][];
    empty: string;
    tone: "weak" | "resist" | "immune";
}> = ({ title, entries, empty, tone }) => (
    <div className="pokemon-effect-group">
        <h3>{title}</h3>
        {entries.length === 0 ? (
            <p className="pokemon-effect-empty">{empty}</p>
        ) : (
            <ul>
                {entries.map(([type, value]) => (
                    <li
                        key={type}
                        className={`pokemon-effect pokemon-effect-${tone} ${
                            value === 4 ? "pokemon-effect-critical" : ""
                        }`}
                    >
                        <span
                            className="pokemon-effect-dot"
                            style={{ background: TYPE_COLORS[type] }}
                        />
                        {typeLabel(type)}
                        {tone !== "immune" && <b>×{formatMultiplier(value)}</b>}
                    </li>
                ))}
            </ul>
        )}
    </div>
);

export default PokemonPower;
