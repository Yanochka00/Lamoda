import React, { useState, useMemo } from 'react';
import Chance from 'chance';
import './App.scss';
import ProductList from './ProductList';
import Filter from './Filter';
import SortOptions from './SortOptions';

const chance = new Chance();

const App = () => {
    const colors = ['Бежевый', 'Розовый', 'Белый', 'Красный', 'Черный'];
    const categories = [
        'Рубашки',
        'Штаны',
        'Майки',
        'Топы',
        'Платья',
        'Носки',
        'Джинсы',
        'Блузки',
        'Футболки',
        'Обувь',
    ];
    const imageUrls = [];
    for (let i = 1; i <= 18; i++) {
        imageUrls.push(`/images/image${i}.jpg`);
    }

    const [products] = useState(generateRandomProducts(100));
    const [filters, setFilters] = useState({
        search: '',
        choiceColor: [],
        minPrice: '',
        maxPrice: '',
        category: '',
    });

    const [sortOrder, setSortOrder] = useState('popular');
    function generateRandomProducts(count) {
        const products = [];
        for (let i = 0; i < count; i++) {
            products.push({
                id: chance.guid(),
                name: chance.word(),
                description: chance.sentence(),
                price: chance.integer({ min: 10, max: 9999 }),
                color: chance.pickone(colors),
                rating: chance.floating({ min: 0, max: 5, fixed: 1 }),
                category: chance.pickone(categories),
                imageUrl: chance.pickone(imageUrls),
            });
        }
        return products;
    }

    const handleSearch = (e) => {
        const searchValue = e.target.value.trimStart();
        setFilters((prev) => ({ ...prev, search: searchValue }));
    };

    const handleColorChange = (color) => {
        setFilters((prev) => {
            const { choiceColor } = prev;
            return {
                ...prev,
                choiceColor: choiceColor.includes(color)
                    ? choiceColor.filter((c) => c !== color)
                    : [...choiceColor, color],
            };
        });
    };

    const handlePriceChange = (e, priceType) => {
        const input = e.target.value.replace(/\D/g, '');
        setFilters((prev) => ({ ...prev, [priceType]: input }));
    };

    const handleCategoryChange = (selectedCategory) => {
        setFilters({ ...filters, category: selectedCategory });
    };

    const applyFilters = (products) => {
        const { search, choiceColor, minPrice, maxPrice, category } = filters;

        return products.filter(
            (product) =>
                (product.name.toLowerCase().includes(search.toLowerCase()) ||
                    product.description.toLowerCase().includes(search.toLowerCase()) ||
                    product.category.toLowerCase().includes(search.toLowerCase())) &&
                (choiceColor.length === 0 || choiceColor.includes(product.color)) &&
                (minPrice === '' || product.price >= Number(minPrice)) &&
                (maxPrice === '' || product.price <= Number(maxPrice)) &&
                (category === '' || product.category === category)
        );
    };

    const sortProducts = (products) => {
        switch (sortOrder) {
            case 'cheap':
                return [...products].sort((a, b) => a.price - b.price);
            case 'expensive':
                return [...products].sort((a, b) => b.price - a.price);
            case 'popular':
                return [...products].sort((a, b) => b.rating - a.rating);
            default:
                return products;
        }
    };

    const filteredProducts = useMemo(() => applyFilters(products), [filters, products]);
    const sortedProducts = useMemo(
        () => sortProducts(filteredProducts),
        [filteredProducts, sortOrder]
    );
    const productCount = filteredProducts.length;
    const { search, choiceColor, minPrice, maxPrice, category } = filters;

    return (
        <div id="root">
            <Filter
                search={search}
                onSearch={handleSearch}
                colors={colors}
                choiceColor={choiceColor}
                handleColorChange={handleColorChange}
                minPrice={minPrice}
                maxPrice={maxPrice}
                handlePriceChange={handlePriceChange}
                categories={categories}
                category={category}
                handleCategoryChange={handleCategoryChange}
            />
            <SortOptions sortOrder={sortOrder} setSortOrder={setSortOrder} />
            <div className="product-count">Количество продуктов: {productCount}</div>
            {productCount === 0 ? (
                <span>Ничего не найдено</span>
            ) : (
                <ProductList products={sortedProducts} />
            )}
        </div>
    );
};

export default App;
