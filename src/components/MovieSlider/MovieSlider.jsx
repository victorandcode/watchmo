import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import MovieCardContainer from '../../containers/MovieCardContainer/MovieCardContainer';
import MovieDetailsBannerContainer from '../../containers/MovieDetailsBannerContainer/MovieDetailsBannerContainer';
import styles from './MovieSlider.scss';
import { v4 } from 'node-uuid';

const maxIndex = 5;

class MovieSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      innerClass: styles.sliderWrapperInner,
      sliderSettings: {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 4
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 3
            }
          }
        ]
      },
      detailsBannerKey: v4()
    }
    this.setHoverClasses = this.setHoverClasses.bind(this);
    this.setFirstHovered = this.setFirstHovered.bind(this);
    this.setLastHovered = this.setLastHovered.bind(this);
    this.setNonBorderHovered = this.setNonBorderHovered.bind(this);
  }

  setHoverClasses(index) {
    if(index === 0) {
      this.setFirstHovered();
    } else if (index % maxIndex === 0) {
      this.setLastHovered();
    } else {
      this.setNonBorderHovered();
    }
  }

  setFirstHovered() {
    this.setState({"innerClass": styles.sliderWrapperInner})
  }

  setLastHovered() {
    this.setState({
      "innerClass": [
        styles.sliderWrapperInner,
        styles.wrapperMoveLeftExtra]
        .join(" ")
    })
  }

  setNonBorderHovered() {
    this.setState({
      "innerClass": [
        styles.sliderWrapperInner, 
        styles.wrapperMoveLeft]
        .join(" ")
    })
  }

  render() {
    return (
      <div className={styles.sliderWrapper}>
        <div className={[styles.desktopSlider, this.state.innerClass].join(" ")}>
          {this.props.movies.map((movieItem, movieItemIndex) => {
              return (
                <div 
                  className={styles.movieCardWrapper} 
                  key={movieItemIndex} 
                  onMouseEnter={(e) => {this.setHoverClasses(movieItemIndex)}}>
                  <MovieCardContainer movie={movieItem}/>
                </div>
              );
            })
          }
        </div>
        <div className={styles.mobileSlider}>
          <Slider {...this.state.sliderSettings}>
            {this.props.movies.map((movieItem, movieItemIndex) => {
              return (
                <div key={movieItemIndex}>
                  <MovieCardContainer movie={movieItem} detailsBannerKey={this.state.detailsBannerKey}/>
                </div>
              );
            })
          }
          </Slider>
        </div>
        <MovieDetailsBannerContainer containerKey={this.state.detailsBannerKey}/>
      </div>
    );
  }
}

export default MovieSlider;