import React, { useEffect, useState } from 'react'

const useDebounce = (value: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        }
    }, [value]);
    return debouncedValue;
}

export default useDebounce