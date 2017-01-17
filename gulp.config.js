module.exports = function () {
  var root = './';
  var name = 'l4j';
  var build = root + 'build/';
  var styles = root + 'styles/';
  // var sources = root + 'sources/';
  // var assets = sources + 'assets/';
  // var app = sources + 'app/';
  // var lib = sources + 'lib/';
  // var assetsStylesFolder = assets + 'styles/';

  var config = {
    root: root,
    name: name,
    build: build,
    index: root + 'index.html',
    styles: styles,
    buildCss: build + name + '.css',
    buildMinCss: build + name + '.min.css'
    // root: root,
    // app: app,
    // index: root + 'index.html',
    // assetsStylesFolder: assetsStylesFolder,
    // indexCss: app + 'index.css',
    // sourcesStyles: app + '**/*.css',
    // sourcesScripts: [
    //   lib + '**/*.js',
    //   app + '**/*.js',
    // ],
    // styles: assetsStylesFolder + '/*.css',
    // scripts: [
    //   lib + '**/*.js',
    //   app + '**/*.js',
    //   root + '*.js'
    // ]
  };

  return config;
};
