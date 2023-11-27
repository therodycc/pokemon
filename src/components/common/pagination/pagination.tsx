import { ReactNode, useCallback, useEffect, useMemo } from "react";


interface PaginationProps {
    page: number
    count: number
    setPage: React.Dispatch<React.SetStateAction<number>>
}

export const Pagination = ({ page = 4, setPage, count }: PaginationProps) => {

    const { shouldShowSuspensivePoint, pageCount } = useMemo(() => {
        const maximumButtons = 5
        const limit = 10
        const pageCount = (count / limit)
        const shouldShowSuspensivePoint = pageCount > maximumButtons;

        return {
            shouldShowSuspensivePoint,
            pageCount
        }

    }, [count])

    useEffect(() => {
        setPage(page)
    }, [page, setPage]);

    const handleChange = useCallback((index: number) => {
        setPage(index)
    }, [setPage])

    const handleNext = useCallback(() => {
        setPage(_prev => _prev + 1)
    }, [setPage])

    const handleBack = useCallback(() => {
        setPage(_prev => _prev - 1)
    }, [setPage])

    const getPrincipalNumbers = useCallback(() => {
        let numbers = []

        for (let index = 0; index < 5; index++) {
            if (page >= pageCount) return;
            numbers.push(index + page)
        }

        return {
            numbers
        }
    }, [page, pageCount])

    return (
        <>
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {page !== 0 &&
                        <Item handleChange={handleBack} >
                            <i className="fa fa-arrow-left"></i>
                        </Item>
                    }
                    {getPrincipalNumbers()?.numbers.map((item, index) => (
                        <Item
                            key={index}
                            active={page === (item)}
                            handleChange={() => handleChange(item)}
                        >
                            {item}
                        </Item>
                    ))}
                    {shouldShowSuspensivePoint &&
                        <Item>
                            <i className="fa-solid fa-bars"></i>
                        </Item>
                    }
                    {(page <= pageCount - 1) &&
                        <Item handleChange={handleNext}>
                            <i className="fa fa-arrow-right"></i>
                        </Item>
                    }
                </ul>
            </nav>
        </>
    );
};


interface ItemProps {
    children: ReactNode
    active?: boolean
    handleChange?: Function
}

const Item = ({ children, active, handleChange: onAction }: ItemProps) => {
    const handleChange = useCallback(() => {
        onAction?.()
    }, [onAction])

    return (
        <li className="page-item" onClick={handleChange} >
            <a
                className="page-link py-2 px-5"
                style={active ?
                    { border: "1px solid white", background: '#7B241C', color: 'white' }
                    : { color: "gray" }}
                href="#"
            >{children}</a>
        </li>
    )
}


