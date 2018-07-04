import * as fetch from 'isomorphic-fetch'

const coreRepo = 'https://raw.githubusercontent.com/teleporthq/teleport-elements-core/master/'

async function getFromRepo(file) {
  try {
    const url = `${coreRepo}${file}`
    const response = await fetch(url)
    if (response.status !== 200) throw new Error(`Could not download ${url}: ${response.statusText}`)

    const data = await response.json()

    if (!data) throw new Error(`Could not download ${url}: EMPTY RESPONSE`)

    return data
  } catch (error) {
    throw new Error(error)
  }
}

async function getData() {
  await getFromRepo('definitions.json')
  await getFromRepo('mapping-html.json')
  await getFromRepo('mapping-react.json')
}

;(async () => {
  await getData()
  // const teleport = new Teleport(definitions, [mappingHtml, mappingReact], new TeleportGeneratorReact())
  // console.log(teleport.generator.componentGenerator.generate(smallComponentJson, {}))
  // console.log(teleport.generator.projectGenerator.generate(smallComponentJson, {}))
})()
