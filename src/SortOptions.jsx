import React from 'react';

const SortOptions = ({ sortOrder, setSortOrder }) => (
    <div className="sort-options">
        <button
            onClick={() => setSortOrder('cheap')}
            style={{ color: sortOrder === 'cheap' ? 'blue' : 'black' }}
        >
            Сначала дешевые
        </button>
        <button
            onClick={() => setSortOrder('expensive')}
            style={{ color: sortOrder === 'expensive' ? 'blue' : 'black' }}
        >
            Сначала дорогие
        </button>
        <button
            onClick={() => setSortOrder('popular')}
            style={{ color: sortOrder === 'popular' ? 'blue' : 'black' }}
        >
            Сначала популярные
        </button>
    </div>
);

export default SortOptions;
