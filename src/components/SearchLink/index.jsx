import React from 'react';

class SearchLink extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick();
  }

  render() {
    return (
      <a
        href='/'
        onClick={this.handleClick}>
        {this.props.title}
      </a>
    )
  }
}

export default SearchLink;