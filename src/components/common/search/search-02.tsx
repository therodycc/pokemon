import { ChangeEvent, useRef } from 'react'

const SearchWithRef = () => {
    const debounceRef = useRef<NodeJS.Timeout>()

    const onQueryChanged = (e: ChangeEvent<HTMLInputElement>) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current)
        }

        debounceRef.current = setTimeout(() => {
            console.log(e.target.value)
        }, 500)
    }

    return (
        <input
            name=''
            type='text'
            onChange={onQueryChanged}
        />

    )
}

export default SearchWithRef