import React from 'react';

const ProductList = ({ products }) => {
    return (
        <div className="product-list">
            {products.map((product) => (
                <div key={product.id} className="product">
                    <img src={product.imageUrl} alt={product.name} />
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Цвет: {product.color}</p>
                    <p>Цена: {product.price}$</p>
                    <p>Рейтинг: {product.rating}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
