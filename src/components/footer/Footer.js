import { Link } from "react-router-dom";
import React from "react";
import { SocialIcon } from "react-social-icons";

function Footer() {
  return (
    <div style={{ width: "100%", backgroundColor:"#13293d" }}>
      <div class="containerC mx-auto py-5 text-white show-grid">
        <div class="row">
          <div class="col-md-6 px-4">
            <Link to="/">
              <img
                src="/images/Marketplace_logo_white.png"
                alt="Logo"
                className=""
                style={{ width: "158px" }}
              />
            </Link>{" "}
            <br />
            The MarketPlace is a business platform designed to help
            Sekondi-Takoradi business owners and individuals to increase revenue
            through sales, business partnerships and collaborations,
            investments, quick jobs and relevant information.
          </div>
          <div class="col-md-2">
            <div className=" quick-links ms-4">
              <strong>
                <h4 className="bold ">Quick Links</h4>
              </strong>
            </div>
            <ol className="quick-links-ol ms-4">
              <>
                <li className="market-link">Market</li>
              </>

              <>
                <li className="FAQ-link">FAQ's</li>
              </>
              <>
                <li className="privacy-link">Privacy Policy</li>
              </>
              <>
                <li className="terms-link">Terms & Conditions</li>
              </>
            </ol>
          </div>
          <div className="col-md-4">
           
            
                <div className=" ms-4">
                  <h4 className="bold ml-3 ms-4">Contact</h4>
                </div>
                <ol className="quick-links-ol ms-4 ">
                  <li>________________________________________________</li>
                  <li>Ama Akroma Plaza</li>
                  <li>SSNIT, Takoradi</li>
                  <li>
                    Telephone:{" "}
                    <a href="tel:+233 20 583 4508" style={{ color: "white" }}>
                      +233 20 583 4508
                    </a>
                  </li>
                  <li>
                    Mail:{" "}
                    <a
                      href="mailto:communityplatform@amalitech.com"
                      style={{ color: "white" }}
                    >
                      marketplace@amalitech.com
                    </a>
                  </li>
                  <li></li>
                </ol>
      
          </div>
        </div>

        <hr className="w-100 mx-auto" />

        <div className="copyrightmsg d-flex justify-content-between">
          <h3 className="">
            &copy; 2022 MarketPlace Inc. All Rights Reserved.
          </h3>
          <div>
            <SocialIcon
              target="_blank"
              rel="noopener"
              title="www.facebook.com/ghmadeofficial"
              className="mx-1"
              url="https://www.facebook.com/ghmadeofficial"
              fgColor="#ffff"
              bgColor="#1B98E0"
              style={{ height: 30, width: 30 }}
            />
            <SocialIcon
              target="_blank"
              rel="noopener"
              title="www.instagram.com/ghmadeofficial"
              className="mx-1"
              url="https://www.instagram.com/ghmadeofficial"
              fgColor="#ffff"
              bgColor="#1B98E0"
              style={{ height: 30, width: 30 }}
            />
            <SocialIcon
              target="_blank"
              rel="noopener"
              title="www.linkedin.com/company/ghmade"
              className="mx-1"
              url="https://www.linkedin.com/company/ghmade/"
              fgColor="#ffff"
              bgColor="#1B98E0"
              style={{ height: 30, width: 30 }}
            />
            <SocialIcon
              target="_blank"
              rel="noopener"
              title="www.twitter.com/ghmadeofficial"
              className="mx-1"
              url="https://www.twitter.com/ghmadeofficial"
              fgColor="#ffff"
              bgColor="#1B98E0"
              style={{ height: 30, width: 30 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
