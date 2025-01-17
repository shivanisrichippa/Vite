import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // For navigation
import { ShopContext } from '../context/ShopContext';


const ProductItem = ({ id, image, name, price ,rentDays}) => {
  const { currency } = useContext(ShopContext);

  return (
    <div className="product-item">
      <Link to={`/product/${id}`}>
        <div className="img-box">
          <img src={image[0]} alt={name} />
        </div>
        <div className="detail-box">
          <h5>{name}</h5>
          <p>
            {currency} {price}
          </p>
          <p>
            {rentDays}
          </p>
        </div>
        
      </Link>
    </div>
  );
};

export default ProductItem;
