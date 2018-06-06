var enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
    };
  };

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  function(callback) {
    setTimeout(callback, 0);
  };