// React Image Lightbox installed via npm. Please see package for future update and references
import React, { Component } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app

class Previewimages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false,
    };
  }

  render() {
    const { photoIndex, isOpen } = this.state;
    const images = this.props.image;

    return (
      <div>
        <img
          class="previewIcon"
          src="https://cdn-icons-png.flaticon.com/512/3596/3596215.png"
          style={{
            backgroundColor: "#F7F7F7",
            objectFit: "cover",
            marginTop: "4px",
            cursor: "pointer",
          }}
          onClick={() => this.setState({ isOpen: true })}
          alt="multiple images"
        />

        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}
      </div>
    );
  }
}

export default Previewimages;
