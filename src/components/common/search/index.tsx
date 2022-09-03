import React, { useEffect, useState } from 'react'
import useDebounce from '../../../hooks/useDebounce';
import Input from '../input';

const Search = () => {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    
    useEffect(() => {
        console.log(debouncedSearch);
    }, [debouncedSearch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    return (
        <React.Fragment>
            <Input
                v-model="inputSearch"
                placeholder="Search"
                value={search}
                onChange={handleChange}
            />
        </React.Fragment>
    )
}

export default Search