import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import pokemons from '../../../../pokemons.json';
import Toast from "../alert/toast";
import Input from '../input';

const Search = () => {
    const router = useRouter()
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState<string[]>([]);

    useEffect(() => {
        setFiltered(pokemons.results.filter(x => x.includes(search)))
    }, [search]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const handleSearch = (pokemon: string) => {
        router.push(`/pokemon-power/${pokemon}`)
    }

    return (
        <React.Fragment>
            <Input
                v-model="inputSearch"
                placeholder="Search"
                value={search}
                onChange={handleChange}
            />
            {!!(search && filtered.length)
                && <div className="position-absolute bg-white p-2 shadow overflow-scroll" style={{ maxHeight: "400px", width: "300px" }}>
                    {filtered?.map((x) => (
                        <>
                            <div className="p-3 rounded hover-search" onClick={() => handleSearch(x)}>
                                <p className="mb-0">{x}</p>
                            </div>
                        </>
                    ))}
                    {!!(search && filtered.length === 0) && <Toast text={"No hemos encontrado nada"} />}
                </div>}
        </React.Fragment>
    )
}

export default Search