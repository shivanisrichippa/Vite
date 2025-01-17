import React from 'react';
import About from './About';
import Product from './Product';
import WhyUs from './WhyUs';

import LatestCollection from '../components/LatestCollection';
import { assets } from '../assets/assets'; // Import assets.js
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';


function Home() {
  return (
    <div>
      <section className="slider_section">
        <div id="customCarousel1" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            {/* Slider Item 1 */}
            <div className="carousel-item active">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="detail-box">
                      <h1>Welcome to our SwipeShare</h1>
                      <p>
                      Where students pretend to be entrepreneurs by renting out their old electronics and tools for a few days..because who doesn't love paying for a laptop charger you'll never use again? Rent, sell, and pretend you're living the dream!</p>
                      <a href="/about">Read More</a>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="img-box">
                      <img src={assets.sliderImg} alt="Slider Image 1" /> {/* Dynamic image reference */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Slider Item 2 */}
            <div className="carousel-item">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    
                    <div className="detail-box">
                      <h1>Welcome to our shop</h1>
                      <p>
                      SwipeShare: Because who wants to buy a new gadget when you can rent someone else's for a few days? Students can swap their stuff too—electronics, appliances, or that random drafting table you needed once!
                      </p>
                      <a href="/about">Read More</a>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="img-box">
                      <img src={assets.sliderImg} alt="Slider Image 2" /> {/* Dynamic image reference */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Slider Item 3 */}
            <div className="carousel-item">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="detail-box">
                      <h1>Welcome to our shop</h1>
                      <p>
                      SwipeShare: The place where students can rent out their barely-used gadgets and pretend they're making money while you're just borrowing someone else's old stuff. Need a product for a few days? Don't worry, we've got a 'rental kingdom' full of electronics and random gadgets!"
                      </p>
                      <a href="/about">Read More</a>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="img-box">
                      <img src={assets.sliderImg} alt="sliderImg" /> {/* Dynamic image reference */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel_btn_box">
            <a className="carousel-control-prev" href="#customCarousel1" role="button" data-slide="prev">
              <i className="fa fa-angle-left" aria-hidden="true"></i>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#customCarousel1" role="button" data-slide="next">
              <i className="fa fa-angle-right" aria-hidden="true"></i>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </section>
      <br />
      <br />
      <br />
      <section className="product_section">
        <div className="container">
          <div className="row">
            <LatestCollection />
          </div>
        </div>
      </section>
      <section className="product_section">
        <div className="container">
          <div className="row">
            <About />
          </div>
        </div>
      </section>
      <section className="product_section">
        <div className="container">
          <div className="row">
            <OurPolicy/>
          </div>
        </div>
      </section>
      <section className="product_section">
        <div className="container">
          <div className="row">
            <BestSeller />
          </div>
        </div>
      </section>
     
      <section className="product_section">
        <div className="container">
          <div className="row">
            <Product />
          </div>
        </div>
      </section>
      <section className="product_section">
        <div className="container">
          <div className="row">
            <WhyUs />
          </div>
        </div>
      </section>
      {/* <section className="product_section">
        <div className="container">
          <div className="row">
            <Testimonials />
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default Home;
