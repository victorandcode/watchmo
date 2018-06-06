import React, { Component } from "react";
import Lightbox from "react-image-lightbox";

class AppLightbox extends Component {
  render() {
    let photoIndex = this.props.index;
    let images = this.props.images;
    return (
      <div>
        {this.props.isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.props.close()}
            onMovePrevRequest={() =>
              this.props.setIndex(
                (photoIndex + images.length - 1) % images.length
              )
            }
            onMoveNextRequest={() =>
              this.props.setIndex((photoIndex + 1) % images.length)
            }
            imageTitle="Sorry! No trailers for this movie yet"
          />
        )}
      </div>
    );
  }
}

export default AppLightbox;
