import React from 'react';
import { assets } from '../assets/assets'; // Adjust the path if needed
import '../styles/css/style.css';
import '../styles/css/bootstrap.css';

function Testimonials() {
  return (
    <div>
      <section className="client_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>
              What Says Our Customers
            </h2>
          </div>
        </div>
        <div className="client_container ">
          <div id="carouselExample2Controls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              {/* Carousel Item 1 */}
              <div className="carousel-item active">
                <div className="container">
                  <div className="box">
                    <div className="detail-box">
                      <p>
                        <i className="fa fa-quote-left" aria-hidden="true"></i>
                      </p>
                      <p>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look...
                      </p>
                    </div>
                    <div className="client-id">
                      <div className="img-box">
                        <img src={assets.client} alt="Client" /> {/* Use dynamic image import */}
                      </div>
                      <div className="name">
                        <h5>James Dew</h5>
                        <h6>Photographer</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Item 2 */}
              <div className="carousel-item">
                <div className="container">
                  <div className="box">
                    <div className="detail-box">
                      <p>
                        <i className="fa fa-quote-left" aria-hidden="true"></i>
                      </p>
                      <p>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters...
                      </p>
                    </div>
                    <div className="client-id">
                      <div className="img-box">
                        <img src={assets.client} alt="Client" /> {/* Use dynamic image import */}
                      </div>
                      <div className="name">
                        <h5>James Dew</h5>
                        <h6>Photographer</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Item 3 */}
              <div className="carousel-item">
                <div className="container">
                  <div className="box">
                    <div className="detail-box">
                      <p>
                        <i className="fa fa-quote-left" aria-hidden="true"></i>
                      </p>
                      <p>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters...
                      </p>
                    </div>
                    <div className="client-id">
                      <div className="img-box">
                        <img src={assets.client} alt="Client" /> {/* Use dynamic image import */}
                      </div>
                      <div className="name">
                        <h5>James Dew</h5>
                        <h6>Photographer</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="carousel_btn-box">
              <a className="carousel-control-prev" href="#carouselExample2Controls" role="button" data-slide="prev">
                <span>
                  <i className="fa fa-angle-left" aria-hidden="true"></i>
                </span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExample2Controls" role="button" data-slide="next">
                <span>
                  <i className="fa fa-angle-right" aria-hidden="true"></i>
                </span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Testimonials;
