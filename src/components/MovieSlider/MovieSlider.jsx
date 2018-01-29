import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import MovieCardContainer from '../../containers/MovieCardContainer/MovieCardContainer';
import MovieDetailsBannerContainer from '../../containers/MovieDetailsBannerContainer/MovieDetailsBannerContainer';
import styles from './MovieSlider.scss';
import { v4 } from 'node-uuid';
import { RESPONSIVE_COLUMN_CONFIG } from '../../constants';


const maxIndex = 5;

class MovieSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      innerClass: styles.sliderWrapperInner,
      sliderSettings: {
        arrows: false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: RESPONSIVE_COLUMN_CONFIG["medium"]["cols"],
        slidesToScroll: 1,
        edgeFriction: 1,
        responsive: [
          {
            breakpoint: RESPONSIVE_COLUMN_CONFIG["small"]["breakpoint"],
            settings: {
              slidesToShow: RESPONSIVE_COLUMN_CONFIG["small"]["cols"]
            }
          },
          {
            breakpoint: RESPONSIVE_COLUMN_CONFIG["extraSmall"]["breakpoint"],
            settings: {
              slidesToShow: RESPONSIVE_COLUMN_CONFIG["extraSmall"]["cols"]
            }
          },
          {
            breakpoint: RESPONSIVE_COLUMN_CONFIG["smallest"]["breakpoint"],
            settings: {
              slidesToShow: RESPONSIVE_COLUMN_CONFIG["smallest"]["cols"]
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
    this.prevSlide = this.prevSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
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

  nextSlide() {
    this.slider.slickNext();
  }

  prevSlide() {
    this.slider.slickPrev();
  }

  render() {
    return (
      <div className={styles.sliderWrapper}>
        <div className={[styles.desktopSlider, this.state.innerClass].join(" ")}>
          {this.props.movies.map((movieItem, movieItemIndex) => {
              return (
                <div 
                  className={styles.movieCardWrapper} 
                  key={movieItem.id} 
                  onMouseEnter={(e) => {this.setHoverClasses(movieItemIndex)}}>
                  <MovieCardContainer movie={movieItem}/>
                </div>
              );
            })
          }
        </div>
        <div className={styles.mobileSlider}>
          {this.props.movies.length ?
            <div>
              <div 
                className={styles.sliderPrevBtnWrapper}
                onClick={this.prevSlide}>
                <span className={styles.prevBtn} />
              </div>
              <Slider ref={c => this.slider = c} {...this.state.sliderSettings}>
                {this.props.movies.map((movieItem, movieItemIndex) => {
                  return (
                    <div key={movieItemIndex}>
                      <div className={styles.sliderItem}>
                        <MovieCardContainer movie={movieItem} detailsBannerKey={this.state.detailsBannerKey}/>
                      </div>
                    </div>
                  );
                })
              }
              </Slider>
              <div 
                className={styles.sliderNextBtnWrapper}
                onClick={this.nextSlide}>
                <span className={styles.nextBtn} />
              </div>
            </div>
            : null
          }
        </div>
        {this.props.isMobile ?
          <MovieDetailsBannerContainer containerKey={this.state.detailsBannerKey}/>
          :
            null
        }
      </div>
    );
  }
}

export default MovieSlider;