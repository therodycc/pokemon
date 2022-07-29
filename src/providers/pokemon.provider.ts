import Provider from ".";
import { SpecifyPokemonI, PokemonI } from '../interfaces/pokemon/pokemon.interface';

class PokemonProvider extends Provider {
    constructor() {
        super("https://pokeapi.co/api/v2/");
    }

    getPokemon(name: string): Promise<SpecifyPokemonI> {
        return this.get<SpecifyPokemonI>(`pokemon/${name}`);
    }

    getPokemonList(params: { limit?: number, offset?: number } = { limit: 10, offset: 0 }): Promise<PokemonI> {
        return this.get<PokemonI, { limit?: number, offset?: number }>("pokemon", { ...params });
    }

}

export default new PokemonProvider();