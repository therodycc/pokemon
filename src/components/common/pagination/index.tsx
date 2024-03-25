import React, { useCallback, useEffect, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";

interface Props {
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
}
export const Pagination = ({ setPage }: Props) => {
    const [currentPage, setCurrentPage] = useState<number>(1)

    const _value = useDebounce<number>(currentPage, 500)

    useEffect(() => {
        _value && setPage(_value - 1)
    }, [_value, setPage]);

    const getCurrentPageGroup = useCallback((currentPage: number) => {
        let exactCurrent = [1, 2].includes(currentPage) ? 1 : currentPage - 2;
        let currentPageGroup = range(exactCurrent, exactCurrent + 4);
        return currentPageGroup;
    }, [])

    const updatePagination = useCallback((page: number) => {
        setCurrentPage(page);
    }, [setCurrentPage])

    const handlePrevClick = useCallback(() => {
        setCurrentPage(_prev => _prev === 1 ? 1 : _prev - 1);
    }, [setCurrentPage])

    const handleNextClick = useCallback(() => {
        setCurrentPage(_prev => _prev + 1);
    }, [setCurrentPage])

    return (
        <section className="pagination">
            <button id="pg-button-prev" type="button" className="pagination__button" onClick={handlePrevClick}>
                <i className="fa fa-chevron-left"></i>
            </button>

            <ul className="pagination__list">
                {getCurrentPageGroup(currentPage).map((page, index) => (
                    <li key={page} className="pagination__item">
                        <button
                            id="pg-button-1"
                            type="button"
                            className={`${currentPage === page ? "active" : ""}`}
                            onClick={() => updatePagination(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>

            <button id="pg-button-next" type="button" className="pagination__button" onClick={handleNextClick}>
                <i className="fa fa-chevron-right"></i>
            </button>
        </section>
    );
};

function range(start: number, stop: number) {
    let _range = [];
    for (let index = start; index <= stop; index++) {
        _range.push(index);
    }
    return _range;
}
