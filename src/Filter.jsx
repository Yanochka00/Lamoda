import React from 'react';

const Filter = ({
    search,
    onSearch,
    colors,
    choiceColor,
    handleColorChange,
    minPrice,
    maxPrice,
    handlePriceChange,
}) => {
    return (
        <div className="filter">
            <input type="text" placeholder="Поиск" value={search} onChange={onSearch} />

            <div className="color-filters">
                {colors.map((color, index) => (
                    <label key={index}>
                        <input
                            type="checkbox"
                            name="choiceColor"
                            checked={choiceColor.includes(color)}
                            onChange={() => handleColorChange(color)}
                        />
                        {color}
                    </label>
                ))}
            </div>

            <div className="price-filters">
                <label>
                    от:
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => handlePriceChange(e, 'minPrice')}
                        placeholder="0"
                        min="0"
                    />
                </label>
                <label>
                    до:
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => handlePriceChange(e, 'maxPrice')}
                        placeholder="9999"
                        min="0"
                    />
                </label>
            </div>
        </div>
    );
};

export default Filter;
