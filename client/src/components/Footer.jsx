import React from 'react'

function Footer() {
  const onSubmitHandler=(event)=>{
    event.preventDefault();

  }
  return (
    <div>
        <section className="info_section ">
      <div className="container">
        <div className="row">
         
          <div className="col-md-3">
            <div className="info_contact">
              <h5><a href="" className="navbar-brand"><span>SwipeShare</span></a></h5>
              <p><i className="fa fa-map-marker" aria-hidden="true"></i> Address</p>
              <p><i className="fa fa-phone" aria-hidden="true"></i> +91 6300832430</p>
              <p><i className="fa fa-envelope" aria-hidden="true"></i> swipeshare.ss@gmail.com</p>
            </div>
          </div>
        
          <div className="col-md-3">
            <div className="info_info">
              <h5>Information</h5>
              <p>Eligendi sunt, provident, debitis nemo, facilis cupiditate velit libero dolorum aperiam enim nulla iste maxime corrupti ad illo libero minus.</p>
            </div>
          </div>
   
          <div className="col-md-3">
            <div className="info_links">
              <h5>Useful Links</h5>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/product">Products</a></li>
                <li><a href="/why">Why Us</a></li>
                <li><a href="/policy">Policies</a></li>
              </ul>
            </div>
          </div>
        
          <div className="col-md-3">
            <div className="info_form">
              <h5>Newsletter</h5>
              <form onSubmit={onSubmitHandler}>
                <input type="email" placeholder="Enter your email"/>
                <button type='submit '>Subscribe</button>
              </form>
              <div className="social_box">
                <a href=""><i className="fa fa-facebook" aria-hidden="true"></i></a>
                <a href=""><i className="fa fa-twitter" aria-hidden="true"></i></a>
                <a href=""><i className="fa fa-instagram" aria-hidden="true"></i></a>
                <a href=""><i className="fa fa-youtube" aria-hidden="true"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
      
  </div>
  )
}

export default Footer
