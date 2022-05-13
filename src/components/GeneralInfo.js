import React from "react";
import "../assets/css/homepage.css";

const Generalinfo = () => {
  return (
    <>
      <div class="mx-auto px-4 generalInfoContainer py-5">
        <div class="row flex-lg-row-reverse g-5 py-5">
          <div class="col d-flex justify-content-end mt-0">
            <img
              src="https://images.unsplash.com/photo-1634838200624-609e82e7d722?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80"
              class="d-block mx-lg-auto img-fluid"
              alt="foodproducts"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
          <div class="col-lg-8 mt-2">
            <h1
              class="display-5 fw-bold lh-1 mb-3"
              style={{ fontFamily: "Roboto,sans-serif" }}
            >
              Quick Information for you to stay safe on our Platform
            </h1>
            <p class="lead" style={{ fontFamily: "Roboto,sans-serif" }}>
              Welcome to the marketplace.com. Meet Sellers in person. Check the
              quality of the item(s) and make sure it meets your expectations
              before making payment
            </p>
            <p class="lead" style={{ fontFamily: "Roboto,sans-serif" }}>
              We do not offer any payment scheme in purchases. Please, report
              users claiming to offer such services.
            </p>
            <div
              class="d-grid gap-2 d-md-flex justify-content-md-start"
              style={{ fontFamily: "Roboto,sans-serif" }}
            >
              <button
                type="button"
                class="btn btn-primary btn-lg px-4 me-md-2"
                style={{ fontFamily: "Roboto,sans-serif" }}
              >
                Learn More
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary btn-lg px-4"
                style={{ fontFamily: "Roboto,sans-serif" }}
              >
                For Businesses
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Generalinfo;
