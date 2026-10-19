// Tabla de tipos vigente desde la generación VI (18 tipos, incluye Hada).
type Relations = { double: string[]; half: string[]; none: string[] };

export const TYPE_ATTACK_CHART: Record<string, Relations> = {
    normal: { double: [], half: ["rock", "steel"], none: ["ghost"] },
    fire: { double: ["grass", "ice", "bug", "steel"], half: ["fire", "water", "rock", "dragon"], none: [] },
    water: { double: ["fire", "ground", "rock"], half: ["water", "grass", "dragon"], none: [] },
    electric: { double: ["water", "flying"], half: ["electric", "grass", "dragon"], none: ["ground"] },
    grass: { double: ["water", "ground", "rock"], half: ["fire", "grass", "poison", "flying", "bug", "dragon", "steel"], none: [] },
    ice: { double: ["grass", "ground", "flying", "dragon"], half: ["fire", "water", "ice", "steel"], none: [] },
    fighting: { double: ["normal", "ice", "rock", "dark", "steel"], half: ["poison", "flying", "psychic", "bug", "fairy"], none: ["ghost"] },
    poison: { double: ["grass", "fairy"], half: ["poison", "ground", "rock", "ghost"], none: ["steel"] },
    ground: { double: ["fire", "electric", "poison", "rock", "steel"], half: ["grass", "bug"], none: ["flying"] },
    flying: { double: ["grass", "fighting", "bug"], half: ["electric", "rock", "steel"], none: [] },
    psychic: { double: ["fighting", "poison"], half: ["psychic", "steel"], none: ["dark"] },
    bug: { double: ["grass", "psychic", "dark"], half: ["fire", "fighting", "poison", "flying", "ghost", "steel", "fairy"], none: [] },
    rock: { double: ["fire", "ice", "flying", "bug"], half: ["fighting", "ground", "steel"], none: [] },
    ghost: { double: ["psychic", "ghost"], half: ["dark"], none: ["normal"] },
    dragon: { double: ["dragon"], half: ["steel"], none: ["fairy"] },
    dark: { double: ["psychic", "ghost"], half: ["fighting", "dark", "fairy"], none: [] },
    steel: { double: ["ice", "rock", "fairy"], half: ["fire", "water", "electric", "steel"], none: [] },
    fairy: { double: ["fighting", "dragon", "dark"], half: ["fire", "poison", "steel"], none: [] },
};

export const TYPE_NAMES_ES: Record<string, string> = {
    normal: "Normal", fire: "Fuego", water: "Agua", electric: "Eléctrico", grass: "Planta",
    ice: "Hielo", fighting: "Lucha", poison: "Veneno", ground: "Tierra", flying: "Volador",
    psychic: "Psíquico", bug: "Bicho", rock: "Roca", ghost: "Fantasma", dragon: "Dragón",
    dark: "Siniestro", steel: "Acero", fairy: "Hada",
};

export const TYPE_COLORS: Record<string, string> = {
    normal: "#a8a77a", fire: "#ee8130", water: "#6390f0", electric: "#f7d02c", grass: "#7ac74c",
    ice: "#96d9d6", fighting: "#c22e28", poison: "#a33ea1", ground: "#e2bf65", flying: "#a98ff3",
    psychic: "#f95587", bug: "#a6b91a", rock: "#b6a136", ghost: "#735797", dragon: "#6f35fc",
    dark: "#705746", steel: "#b7b7ce", fairy: "#d685ad",
};

// Multiplicador de daño recibido por cada tipo atacante, combinando los tipos defensores.
export const getDefensiveMultipliers = (defendingTypes: string[]): Record<string, number> => {
    const result: Record<string, number> = {};
    Object.entries(TYPE_ATTACK_CHART).forEach(([attacker, relations]) => {
        result[attacker] = defendingTypes.reduce((multiplier, defender) => {
            if (relations.none.includes(defender)) return multiplier * 0;
            if (relations.double.includes(defender)) return multiplier * 2;
            if (relations.half.includes(defender)) return multiplier * 0.5;
            return multiplier;
        }, 1);
    });
    return result;
};
