import React, { FormEvent, useEffect, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";

interface Props {
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    totalPages: number
}

type PageItem = number | "start-ellipsis" | "end-ellipsis";

const getPageItems = (current: number, total: number): PageItem[] => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const items: PageItem[] = [1];
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    if (start > 2) items.push("start-ellipsis");
    for (let p = start; p <= end; p++) items.push(p);
    if (end < total - 1) items.push("end-ellipsis");
    items.push(total);
    return items;
};

export const Pagination = ({ setPage, totalPages }: Props) => {
    const total = Math.max(totalPages, 1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [jumpValue, setJumpValue] = useState("");
    const current = Math.min(currentPage, total);

    // La UI cambia al instante; la carga de datos espera al debounce.
    const _value = useDebounce<number>(currentPage, 500);

    useEffect(() => {
        _value && setPage(_value - 1);
    }, [_value, setPage]);

    const goTo = (target: number) => {
        setCurrentPage(Math.min(Math.max(target, 1), total));
        setJumpValue("");
    };

    const handleJump = (event: FormEvent) => {
        event.preventDefault();
        const value = parseInt(jumpValue, 10);
        if (!Number.isNaN(value)) goTo(value);
        setJumpValue("");
    };

    const atStart = current === 1;
    const atEnd = current === total;

    return (
        <nav className="pagination" aria-label="Paginación de Pokémon">
            <div className="pagination__controls">
                <button type="button" className="pagination__button" onClick={() => goTo(1)} disabled={atStart} aria-label="Primera página" title="Primera página">
                    <i className="fa fa-angle-double-left"></i>
                </button>
                <button type="button" className="pagination__button" onClick={() => goTo(current - 1)} disabled={atStart} aria-label="Página anterior" title="Página anterior">
                    <i className="fa fa-chevron-left"></i>
                </button>

                <ul className="pagination__list">
                    {getPageItems(current, total).map((item) =>
                        typeof item === "number" ? (
                            <li key={item} className="pagination__item">
                                <button
                                    type="button"
                                    className={current === item ? "active" : ""}
                                    aria-current={current === item ? "page" : undefined}
                                    aria-label={`Página ${item}`}
                                    onClick={() => goTo(item)}
                                >
                                    {item}
                                </button>
                            </li>
                        ) : (
                            <li key={item} className="pagination__ellipsis" aria-hidden="true">…</li>
                        )
                    )}
                </ul>

                <button type="button" className="pagination__button" onClick={() => goTo(current + 1)} disabled={atEnd} aria-label="Página siguiente" title="Página siguiente">
                    <i className="fa fa-chevron-right"></i>
                </button>
                <button type="button" className="pagination__button" onClick={() => goTo(total)} disabled={atEnd} aria-label="Última página" title="Última página">
                    <i className="fa fa-angle-double-right"></i>
                </button>
            </div>

            <form className="pagination__jump" onSubmit={handleJump}>
                <span className="pagination__status">Página {current} de {total}</span>
                <label htmlFor="pagination-jump" className="pagination__sr">Ir a la página</label>
                <input
                    id="pagination-jump"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={total}
                    value={jumpValue}
                    placeholder="Ir a…"
                    onChange={(e) => setJumpValue(e.target.value)}
                />
                <button type="submit" className="pagination__go" disabled={!jumpValue}>Ir</button>
            </form>
        </nav>
    );
};
