import { FC, useMemo } from "react";
import Link from "next/link";
import { SpecifyPokemonI } from "../../../interfaces/pokemon/pokemon.interface";

// Referencia: Eternatus Eternamax, la mayor suma de estadísticas base (1125).
const REFERENCE = {
    name: "Eternatus Eternamax",
    stats: { hp: 255, attack: 115, defense: 250, "special-attack": 125, "special-defense": 250, speed: 130 } as Record<string, number>,
};
const REFERENCE_TOTAL = Object.values(REFERENCE.stats).reduce((a, b) => a + b, 0);

const AXES = [
    { key: "hp", label: "PS" },
    { key: "attack", label: "Ataque" },
    { key: "defense", label: "Defensa" },
    { key: "special-attack", label: "At. esp." },
    { key: "special-defense", label: "Def. esp." },
    { key: "speed", label: "Velocidad" },
];

const MAX_POKEDEX_ID = 1025;
const FIRST_FORM_ID = 10001;

// Las formas alternativas (id >= 10001) van en una secuencia aparte; si el id siguiente no existe, la página redirige al inicio.
const getPrevId = (id: number) => (id === FIRST_FORM_ID ? MAX_POKEDEX_ID : id > 1 ? id - 1 : null);
const getNextId = (id: number) => (id === MAX_POKEDEX_ID ? FIRST_FORM_ID : id + 1);
const SIZE = 300;
const CENTER = SIZE / 2;
const RADIUS = 100;

const point = (index: number, ratio: number) => {
    const angle = (Math.PI * 2 * index) / AXES.length - Math.PI / 2;
    return [CENTER + Math.cos(angle) * RADIUS * ratio, CENTER + Math.sin(angle) * RADIUS * ratio];
};

const toPath = (ratios: number[]) =>
    ratios.map((ratio, i) => point(i, ratio).join(",")).join(" ");

const PokemonHeaderChart: FC<{ pokemon: SpecifyPokemonI }> = ({ pokemon }) => {
    const values = useMemo(
        () =>
            AXES.map(({ key }) => pokemon.stats?.find(({ stat }) => stat.name === key)?.base_stat ?? 0),
        [pokemon]
    );
    const total = values.reduce((a, b) => a + b, 0);
    const percent = Math.round((total / REFERENCE_TOTAL) * 100);
    const referenceRatios = AXES.map(({ key }) => REFERENCE.stats[key] / 255);
    const ratios = values.map((value) => Math.min(value / 255, 1));

    const prevId = getPrevId(pokemon.id);
    const nextId = getNextId(pokemon.id);

    return (
        <div className="header-chart">
            <svg
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                role="img"
                aria-label={`Comparación de estadísticas de ${pokemon.name} frente a ${REFERENCE.name}`}
            >
                {[0.25, 0.5, 0.75, 1].map((level) => (
                    <polygon key={level} points={toPath(AXES.map(() => level))} className="header-chart-grid" />
                ))}
                {AXES.map(({ label }, i) => {
                    const [x, y] = point(i, 1);
                    const [lx, ly] = point(i, 1.28);
                    return (
                        <g key={label}>
                            <line x1={CENTER} y1={CENTER} x2={x} y2={y} className="header-chart-grid" />
                            <text x={lx} y={ly} className="header-chart-label" textAnchor="middle" dominantBaseline="middle">
                                {label}
                            </text>
                        </g>
                    );
                })}
                <polygon points={toPath(referenceRatios)} className="header-chart-reference" />
                <polygon points={toPath(ratios)} className="header-chart-pokemon" />
            </svg>
            <div className="header-chart-info">
                <h2>Poder frente al más fuerte</h2>
                <strong>{percent}%</strong>
                <p>
                    {total} de {REFERENCE_TOTAL} puntos base
                </p>
                <ul>
                    <li><i className="header-chart-key header-chart-key--pokemon" />{pokemon.name.replace(/-/g, " ")}</li>
                    <li><i className="header-chart-key header-chart-key--reference" />{REFERENCE.name}</li>
                </ul>
                <nav className="header-chart-nav" aria-label="Navegar entre Pokémon">
                    {prevId ? (
                        <Link href={`/pokemon-power/${prevId}`}>
                            <a aria-label="Pokémon anterior">‹ N.º {String(prevId).padStart(3, "0")}</a>
                        </Link>
                    ) : (
                        <span />
                    )}
                    <Link href={`/pokemon-power/${nextId}`}>
                        <a aria-label="Pokémon siguiente">N.º {String(nextId).padStart(3, "0")} ›</a>
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default PokemonHeaderChart;
