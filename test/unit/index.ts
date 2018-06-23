import * as fs from 'fs'
import * as fetch from 'isomorphic-fetch'

import teleport from '../../src'
import Publisher from '../../src/lib/Publisher'
import ElementsLibrary from '../../src/lib/ElementsLibrary'
import Mapping from '../../src/lib/ElementsLibraryTargetMapping'

// local
const invalidPath = 'this/path/does/not/exist'
const validPath = `${__dirname}/data/libraries/teleport-elements-core.json`
const localDefinitions = JSON.parse(fs.readFileSync(validPath).toString())

// remote
const coreRepo = 'https://gitlab.com/teleporthq/teleport-elements-core/raw/master/'
const invalidUrl = `${coreRepo}invalidUrl`
const definitionsUrl = `${coreRepo}definitions.json`
const htmlMappingUrl = `${coreRepo}mapping-html.json`
const reactMappingUrl = `${coreRepo}mapping-react.json`

// utils
const getFromRepo = async (file) => {
  try {
    const url = `${coreRepo}${file}`
    const response = await fetch(url)
    if (response.status !== 200)
      throw new Error(`--- Could not download ${url}: ${response.statusText}`)

    const data = await response.json()

    if (!data)
      throw new Error(`Could not download ${url}: EMPTY RESPONSE`)

    return data
  } catch (error) {
    throw new Error(error)
  }
}

let definitions = {}
let mappingHtml = {}
let mappingReact = {}

// tests
beforeAll(async () => {
  definitions = await getFromRepo('definitions.json')
  mappingHtml = await getFromRepo('mapping-html.json')
  mappingReact = await getFromRepo('mapping-react.json')
})

describe('Teleport', () => {
  describe('utils', () => {
    it('should reject because of invalid plugin path (readPluginDefinitionFromFile)', () => {
      expect(teleport.readPluginDefinitionFromFile(invalidPath))
        .rejects.toThrow(`path \`this/path/does/not/exist\` does not exist`)
    })
    it('should return a definition object (readPluginDefinitionFromFile)', async () => {
      expect(await teleport.readPluginDefinitionFromFile(validPath))
        .toEqual(localDefinitions)
    })
    it('should throw an error for invalid url (readPluginDefinitionFromUrl)', async () => {
      expect(teleport.readPluginDefinitionFromUrl(invalidUrl))
        .rejects.toThrow()
    })
    it('should return a definition object (readPluginDefinitionFromUrl)', async () => {
      expect(await teleport.readPluginDefinitionFromUrl(definitionsUrl))
        .toEqual(definitions)
    })
  })

  describe('libraries', () => {
    it('should return an instance of teleport (useLibrary)', async () => {
      expect(teleport.useLibrary(new ElementsLibrary(localDefinitions)))
        .toEqual(teleport)
    })
    it('should return a library definition', async () => {
      const { name } = localDefinitions
      expect(teleport.library(name).name)
        .toEqual(name)
    })
  })

  describe('publishers', () => {
    const publisher = new Publisher('test')
    it('should return an instance of teleport', async () => {
      expect(teleport.usePublisher(publisher))
        .toEqual(teleport)
    })
    it('should return a Publisher (publisher)', async () => {
      expect(teleport.publisher('test'))
        .toEqual(publisher)
    })
  })

  describe('mappings', () => {
    it('should throw an error for mapping dependency (useMapping)', async () => {
      expect(() => teleport.useMapping(mappingReact))
        .toThrow()
    })

    it('should return an instance of teleport (useMapping)', async () => {
      expect(teleport.useMapping(mappingHtml))
        .toEqual(teleport)
    })

    it('should return an instance of teleport / mapping extension (useMapping)', async () => {
      expect(teleport.useMapping(mappingReact))
        .toEqual(teleport)
    })

    it('should return a mapping (mapping)', async () => {
      expect(teleport.mapping('teleport-elements-core-react').name)
        .toEqual('teleport-elements-core-react')
    })
  })
})
