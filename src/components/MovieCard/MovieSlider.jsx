import React from 'react';
import { Slider } from 'react-slick';
import MovieCard from '../MovieCard/MovieCard';

class MovieSlider extends React.Component {
  constructor(props) {
    super(props);
    this.sliderSettings = {
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1
    };
  }

  render() {
    /*
      {groupItem.content.map((movieItem, movieItemIndex) => {
              return (<MovieCard key={movieItemIndex} movie={movieItem}/>);
            })}
    */
    return (
      <Slider {...this.sliderSettings}>
        <div><h3>1</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div>
        <div><h3>5</h3></div>
        <div><h3>6</h3></div>
      </Slider>
    );
  }
}

export default MovieSlider;