import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';


const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products) {
      const sorted = [...products].sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date
      setLatestProducts(sorted.slice(0, 3));
    }
  }, [products]);

  return (
    <section className="product_section layout_padding">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>Latest Collection</h2>
        </div>
        <div className="row">
          {latestProducts.map((product) => (
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
                  <div className="product_info">
                    <h5><span>Rs.</span> {product.price}</h5>
                    <p>Rent Days: {product.rentDays}</p>
                    <div className="star_container">
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="btn_box">
          <a href="/product" className="view_more-link">View More</a>
        </div>
      </div>
    </section>
  );
};

export default LatestCollection;
