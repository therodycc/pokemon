import React, { useEffect, useState } from 'react'

const useDebounce = <T extends any>(value: T, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState<T | null>(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        }
    }, [delay, value]);

    return debouncedValue;
}

export default useDebounce