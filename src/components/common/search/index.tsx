import React, { useEffect, useState } from 'react'
import useDebounce from '../../../hooks/useDebounce';
import Input from '../input';
import pokemons from '../../../../pokemons.json'

const Search = () => {
    const [search, setSearch] = useState("");

    const [filtered, setFiltered] = useState<string[]>([]);

    useEffect(() => {
        setFiltered(pokemons.results.filter(x => x.includes(search)))
    }, [search]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const handleSearch = (pokemon: string) => {
        console.log(`🪲  ======>  | pokemon:`, pokemon)
    }

    return (
        <React.Fragment>
            <Input
                v-model="inputSearch"
                placeholder="Search"
                value={search}
                onChange={handleChange}
            />
            {search && <div className="position-absolute bg-white p-2 shadow overflow-scroll" style={{ maxHeight: "400px", width: "300px" }}>
                {filtered.map((x) => (
                    <>
                        <div className="p-3 rounded hover-search" onClick={() => handleSearch(x)}>
                            <p className="mb-0">{x}</p>
                        </div>
                    </>
                ))}
            </div>}
        </React.Fragment>
    )
}

export default Search