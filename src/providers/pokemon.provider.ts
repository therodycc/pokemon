import Provider from ".";

class PokemonProvider extends Provider {
    constructor() {
        super("https://pokeapi.co/api/v2/");
    }

    getPokemon(name: string) {
        return this.get(`pokemon/${name}`);
    }

    getPokemonList(params: any = {}) {
        return this.get("pokemon", { ...params });
    }

}

export default new PokemonProvider();