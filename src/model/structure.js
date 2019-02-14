const path = require('path')
const urljoin = require('url-join')

const BROWSER_SUPPORTED_EXT = /(jpg|jpeg|png|gif)$/i

exports.folders = function (filepath, rel, options = {}) {
  const dir = path.dirname(filepath)
  const name = path.basename(filepath, path.extname(filepath))
  const ext = path.extname(filepath).substr(1)
  const photoExt = photoExtension(filepath)
  const videoExt = options.videoFormat || 'mp4'
  switch (rel) {
    case 'photo:thumbnail': return `media/thumbs/${dir}/${name}.${photoExt}`
    case 'photo:large': return `media/large/${dir}/${name}.${photoExt}`
    case 'video:thumbnail': return `media/thumbs/${dir}/${name}.jpg`
    case 'video:poster': return `media/large/${dir}/${name}.jpg`
    case 'video:resized': return `media/large/${dir}/${name}.${videoExt}`
    case 'fs:copy': return `media/original/${dir}/${name}.${ext}`
    case 'fs:symlink': return `media/original/${dir}/${name}.${ext}`
    case 'fs:link': return join(options.linkPrefix, filepath)
    default: throw new Error(`Invalid relationship: ${rel}`)
  }
}

exports.suffix = function (filepath, rel, options = {}) {
  const dir = path.dirname(filepath)
  const name = path.basename(filepath, path.extname(filepath))
  const ext = path.extname(filepath).substr(1)
  const photoExt = photoExtension(filepath)
  const videoExt = options.videoFormat || 'mp4'
  switch (rel) {
    case 'photo:thumbnail': return `media/${dir}/${name}_${ext}_thumb.${photoExt}`
    case 'photo:large': return `media/${dir}/${name}_${ext}_large.${photoExt}`
    case 'video:thumbnail': return `media/${dir}/${name}_${ext}_thumb.jpg`
    case 'video:poster': return `media/${dir}/${name}_${ext}_poster.jpg`
    case 'video:resized': return `media/${dir}/${name}_${ext}_large.${videoExt}`
    case 'fs:copy': return `media/${dir}/${name}.${ext}`
    case 'fs:symlink': return `media/${dir}/${name}.${ext}`
    case 'fs:link': return join(options.linkPrefix, filepath)
    default: throw new Error(`Invalid relationship: ${rel}`)
  }
}

function photoExtension (filepath) {
  const extension = path.extname(filepath).substr(1)
  return extension.match(BROWSER_SUPPORTED_EXT) ? extension : 'jpg'
}

function join (prefix, filepath) {
  if (prefix.match(/^https?:\/\//)) {
    return urljoin(prefix, filepath)
  } else if (prefix.match(/^file:\/\//)) {
    let joineduri = urljoin(prefix, filepath)
    return joineduri.replace(/file:\/\/\//,"file://///")
  } else  {
    return path.join(prefix, filepath)
  }
}
