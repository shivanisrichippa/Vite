import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { assets } from '../assets/assets';  // Adjust the path if needed
import '../styles/css/style.css';
import '../styles/css/bootstrap.css';

const OurPolicy = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div>
      {/* Our Policies Section */}
      <section className="why_us_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Our Policies</h2>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="box" onClick={() => navigate('/exchange')}> {/* Navigate to exchange page */}
                <div className="img-box">
                  <img src={assets.exchange_icon} alt="Exchange" />
                </div>
                <div className="detail-box">
                  <h5>Exchange</h5>
                  <p>Request an exchange within 24 hours of delivery; otherwise, it's not applicable.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box" onClick={() => navigate('/return')}> {/* Navigate to return page */}
                <div className="img-box">
                  <img src={assets.w2} alt="Return" />
                </div>
                <div className="detail-box">
                  <h5>Return</h5>
                  <p>Return rented products within the rental period; else, double charges will apply.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box" onClick={() => navigate('/sell-product')}> {/* Navigate to sell product page */}
                <div className="img-box">
                  <img src={assets.quality_icon} alt="Sell Your Product" />
                </div>
                <div className="detail-box">
                  <h5>Sell your Product</h5>
                  <p>Sell your product by uploading it here; admin verification required before listing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurPolicy;
