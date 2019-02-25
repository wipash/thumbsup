const path = require('path')

module.exports = (target, options) => {
  const albumPath = options.data.root.album.path
  const relative = path.relative(path.dirname(albumPath), target)

  // Escape all characters
  let splitUrl = relative.split('/');
  splitUrl.forEach((element, index, array) => {
    array[index] = encodeURIComponent(array[index]);
  });
  return splitUrl.join('/');

}
