import TeleportGeneratorReact from '../../teleport-generator-react'
import * as fetch from 'isomorphic-fetch'
import Teleport from './Teleport2'
const smallComponentJson = require('../../teleport-lib-js-dev/in/components/test.json')

const coreRepo = 'https://gitlab.com/teleporthq/teleport-elements-core/raw/master/'

let definitions
let mappingHtml
let mappingReact

async function getFromRepo (file) {
  try {
    const url = `${coreRepo}${file}`
    const response = await fetch(url)
    if (response.status !== 200)
      throw new Error(`Could not download ${url}: ${response.statusText}`)

    const data = await response.json()

    if (!data)
      throw new Error(`Could not download ${url}: EMPTY RESPONSE`)

    return data
  } catch (error) {
    throw new Error(error)
  }
}

async function getData() {
  definitions = await getFromRepo('definitions.json')
  mappingHtml = await getFromRepo('mapping-html.json')
  mappingReact = await getFromRepo('mapping-react.json')
}

(async () => {
  await getData()
  const teleport = new Teleport(definitions, [mappingHtml, mappingReact], new TeleportGeneratorReact())
  console.log(teleport.generator.componentGenerator.generate(smallComponentJson, {}))
  console.log(teleport.generator.projectGenerator.generate(smallComponentJson, {}))
})()


