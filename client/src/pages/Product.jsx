import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

const Product = () => {
  const { products } = useContext(ShopContext);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Electrical', 'Electronics', 'Stationery'];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((product) => product.category === selectedCategory);

  return (
    <section className="product_section layout_padding">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>Our Products</h2>
        </div>
        <div className="dropdown mb-4 text-center">
          <button
            className="btn p-0"
            type="button"
            data-bs-toggle="dropdown"
            style={{ fontSize: '16px', fontWeight: 'bold' }}
          >
            <i className="fa fa-filter me-2" /> Add Filters
          </button>
          <ul className="dropdown-menu">
            {categories.map((category) => (
              <li key={category}>
                <button
                  className={`dropdown-item ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product._id} className="col-sm-6 col-lg-4">
              <div className="box">
                <div className="img-box">
                  <img src={product.image[0]} alt={product.name} />
                  <a href={`/product/${product._id}`} className="add_cart_btn">
                    <span>Know More</span>
                  </a>
                </div>
                <div className="detail-box">
                  <h5>{product.name}</h5>
                  <h5><span>Rs.</span> {product.price}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Product;



