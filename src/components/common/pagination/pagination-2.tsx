import React, { useState } from 'react';

const data = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'Bob Smith' },
    { id: 4, name: 'Alice Johnson' },
    { id: 5, name: 'Tom Wilson' },
    { id: 6, name: 'Sara Brown' },
    { id: 7, name: 'Mike Davis' },
    { id: 8, name: 'Lisa Green' },
    { id: 9, name: 'Peter Lee' },
    { id: 10, name: 'Mary Kim' },
    { id: 11, name: 'Mark Thompson' },
    { id: 12, name: 'Chris Martin' },
    { id: 13, name: 'Amy Chen' },
    { id: 14, name: 'David Lee' },
    { id: 15, name: 'Karen Kim' },
];

const PAGE_SIZE = 5;

export const Pagination2 = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const paginatedData = data.slice(startIndex, startIndex + PAGE_SIZE);
    const pageCount = Math.ceil(data.length / PAGE_SIZE);
    const pages = [...Array(pageCount).keys()].map((i) => i + 1);

    return null
    return (
        <div>
            <ul>
                {paginatedData.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
            <div>
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        disabled={currentPage === page}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};
