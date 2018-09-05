/**
 * Cleans path from leading and tailing "." and "/" characters
 * @param pathString
 */
export function cleanPath(pathString) {
  return pathString
    .replace(/^\.\./, '')
    .replace(/^\./, '')
    .replace(/^\//, '')
    .replace(/\/$/, '')
}

/**
 * Given a source directory and a target filename, return the relative
 * file path from source to target.
 * @param source {String} directory path to start from for traversal
 * @param target {String} directory path and filename to seek from source
 * @return Relative path (e.g. "../../style.css") as {String}
 */
export function getRelativePath(source, target) {
  const sep = '/'
  const targetArr = target.split(sep)
  const sourceArr = source.split(sep)
  const filename = targetArr.pop()
  const targetPath = targetArr.join(sep)
  let relativePath = ''

  while (targetPath.indexOf(sourceArr.join(sep)) === -1) {
    sourceArr.pop()
    relativePath += '..' + sep
  }

  const relPathArr = targetArr.slice(sourceArr.length)

  if (relPathArr.length) {
    relativePath += relPathArr.join(sep) + sep
  }

  return relativePath + filename
}

export function findNextIndexedKeyInObject(object, key) {
  if (!object[key]) return key
  let i = 1
  while (object[key + '_' + i] !== undefined) {
    i++
  }
  return key + '_' + i
}
