import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../../assets/css/carousel.css";


function CarouselSlider() {
  return (
    <div>
      <Carousel
        showThumbs={false}
        showStatus={true}
        autoFocus={true}
        infiniteLoop={true}
        // emulateTouch
        autoPlay={true}
        interval={3000 * 3}
        useKeyboardArrows={true}
        //transitionTime={1000}
        // axis="vertical"
        //selectedItem={1}
        width="100%"
      >
        <div className="slide-holder">
          <img
            alt=""
            src="./images/11.jpg"
          />
          <div className="text-container">
            <h2>Bugatti Chiron Super Sport 300</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua se. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="slide-holder">
          <img
            alt=""
            src="./images/4.jpg"
          />
          <div className="text-container">
            <h2>Bugatti Chiron Super Sport 300</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua se. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="slide-holder">
          <img
            alt=""
            src="./images/113.jpg"
          />
          <div className="text-container">
            <h2>Bugatti Chiron Super Sport 300</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua se. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="slide-holder">
          <img
            alt=""
            src="./images/5.jpg"
          />
          <div className="text-container">
            <h2>Bugatti Chiron Super Sport 300</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua se. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="slide-holder">
          <img
            alt=""
            src="./images/1.jpg"
          />
          <div className="text-container">
            <h2>Bugatti Chiron Super Sport 300</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua se. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="slide-holder">
          <img
            alt=""
            src="./images/114.jpg"
          />
          <div className="text-container">
            <h2>Bugatti Chiron Super Sport 300</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua se. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="slide-holder">
          <img
            alt=""
            src="./images/2.jpg"
          />
          <div className="text-container">
            <h2>SSC Tuatara: 300+ mph*</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua se. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="slide-holder">
          <img
            alt=""
            src="./images/12.jpg"
          />
          <div className="text-container">
            <h2>Bugatti Chiron Super Sport 300</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua se. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="slide-holder">
          <img
            alt=""
            src="./images/3.jpg"
          />
          <div className="text-container">
            <h2>Bugatti Chiron Super Sport 300</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua se. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="slide-holder">
          <img
            alt=""
            src="./images/7.jpg"
          />
          <div className="text-container">
            <h2>Bugatti Chiron Super Sport 300</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua se. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="slide-holder">
          <img
            alt=""
            src="./images/22.jpg"
          />
          <div className="text-container">
            <h2>Bugatti Chiron Super Sport 300</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua se. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default CarouselSlider;