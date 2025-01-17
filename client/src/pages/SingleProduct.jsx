import React, { useContext, useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { ShopContext } from '../context/ShopContext';
import { Carousel } from 'react-bootstrap';  // If using Bootstrap carousel
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';  // Import the toast function
import 'react-toastify/dist/ReactToastify.css';  // Import the CSS

const SingleProduct = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();

  const fetchProductData = async () => {
    const product = products.find(item => item._id === productId);
    if (product) {
      setProductData(product);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [products, productId]);

  // If productData is not found or loading
  if (!productData) {
    return <div>Loading...</div>;
  }

  // Handle adding to cart
  // const handleAddToCart = () => {
  //   addToCart(productData._id);  // Call addToCart with the product ID
  //   toast.success('Product added to cart');  // Display success toast
  // };
  const handleAddToCart = () => {
    addToCart(productData._id);
    toast.success('Product added to cart');
};


  const handleBuyNow = () => {
    toast.success('Proceed to CheckOut');
    navigate("/place-order");
   

  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fa fa-star ${i <= rating ? 'text-warning' : 'fa-star-o text-muted'}`}
          aria-hidden="true"
        />
      );
    }
    return stars;
  };

  return (
    <section className="product_section layout_padding">
      <div className="container">
        <div className="heading_container heading_center mb-5">
          <h2>{productData.name}</h2>
        </div>
        <div className="row">
          {/* Product Images Carousel */}
          <div className="col-sm-12 col-md-6">
            <Carousel>
              {productData.image.map((img, index) => (
                <Carousel.Item key={index}>
                  <img className="d-block w-100" src={img} alt={`Product Image ${index + 1}`} />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          {/* Product Details */}
          <div className="col-sm-12 col-md-6">
            <div className="detail-box">
              <p>{productData.description}</p>
              <p><strong>100% Quality Product</strong></p>
              <h5><span>Rs.</span> {productData.price}</h5>
              <div className="product_info mb-3">
                <p><strong>Category:</strong> {productData.category}</p>
                <p><strong>Rent Days:</strong> {productData.rentDays} days</p>
                <p><strong>Best Seller:</strong> {productData.bestseller ? 'Yes' : 'No'}</p>
              </div>

              {/* Rating Stars */}
              <div className="star_rating mb-3">
                <strong>Rating: </strong>
                {renderStars(productData.rating)}
              </div>

              {/* Additional Policies */}
              <p><strong>Return Policy:</strong> Return the product within {productData.rentDays} days.</p>
              <p><strong>Exchange Policy:</strong> Exchange it within 24 hours of delivery.</p>
              <p><strong>Cash on delivery:</strong> Available.</p>

              {/* Buttons */}
              <div className="buttons d-flex flex-column flex-md-row">
                <button className="btn btn-primary mb-3 mb-md-0 mr-md-3" onClick={handleBuyNow}>
                  Buy Now
                </button>
                <button className="btn btn-secondary" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews_section mt-5">
          <h3>Customer Reviews</h3>
          {productData.reviews && productData.reviews.length > 0 ? (
            <div className="reviews_list">
              {productData.reviews.map((review, index) => (
                <div key={index} className="review_item mb-4">
                  <div className="review_header d-flex justify-content-between">
                    <strong>{review.user}</strong>
                    <div className="star_rating">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews yet. Be the first to review this product!</p>
          )}
        </div>
      </div>
      <RelatedProducts category={productData.category} />
    </section>
  );
};

export default SingleProduct;
