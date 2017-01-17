module.exports = function () {
  var root = './';
  var name = 'l4j';
  var build = root + 'build/';
  var styles = root + 'styles/';

  var config = {
    root: root,
    name: name,
    build: build,
    index: root + 'index.html',
    styles: styles,
    buildCss: build + name + '.css',
    buildMinCss: build + name + '.min.css'
  };

  return config;
};
