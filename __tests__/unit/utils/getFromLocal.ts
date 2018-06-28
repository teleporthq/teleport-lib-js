import { readFileSync } from 'fs'
declare const __DATA__: string  // set in jest globals

export default (dataPath: string) => {
  return JSON.parse(readFileSync(`${__DATA__}/${dataPath}`).toString())
}