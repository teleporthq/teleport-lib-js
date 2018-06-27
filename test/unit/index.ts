import * as fs from 'fs'
import * as fetch from 'isomorphic-fetch'

import Teleport from '../../src'
import Publisher from '../../src/lib/Publisher'
import ElementsLibrary from '../../src/lib/ElementsLibrary'
import { Mapping, LibraryDefinition } from '../../src/types/index'
import Target from '../../src/lib/Target';

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
      throw new Error(`Could not download ${url}: ${response.statusText}`)

    const data = await response.json()

    if (!data)
      throw new Error(`Could not download ${url}: EMPTY RESPONSE`)

    return data
  } catch (error) {
    throw new Error(error)
  }
}

let definitions: LibraryDefinition
let mappingHtml: Mapping
let mappingReact: Mapping

// tests
beforeAll(async () => {
  definitions = await getFromRepo('definitions.json')
  mappingHtml = await getFromRepo('mapping-html.json')
  mappingReact = await getFromRepo('mapping-react.json')
})

describe('Teleport', () => {
  describe('utils', () => {
    it('should reject because of invalid plugin path (readPluginDefinitionFromFile)', () => {
      expect(new Teleport().readPluginDefinitionFromFile(invalidPath))
        .rejects.toThrow(`path \`this/path/does/not/exist\` does not exist`)
    })
    it('should return a definition object (readPluginDefinitionFromFile)', async () => {
      expect(await new Teleport().readPluginDefinitionFromFile(validPath))
        .toEqual(localDefinitions)
    })
    it('should throw an error for invalid url (readPluginDefinitionFromUrl)', async () => {
      expect(new Teleport().readPluginDefinitionFromUrl(invalidUrl))
        .rejects.toThrow()
    })
    it('should return a definition object (readPluginDefinitionFromUrl)', async () => {
      expect(await new Teleport().readPluginDefinitionFromUrl(definitionsUrl))
        .toEqual(definitions)
    })
  })

  describe('libraries', () => {
    const teleport = new Teleport()
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
    const teleport = new Teleport()
    const publisher = new Publisher('test')
    it('should return an instance of teleport', async () => {
      const publisher = new Publisher('test')
      expect(teleport.usePublisher(publisher))
        .toEqual(teleport)
    })
    it('should return a Publisher (publisher)', async () => {
      const publisher = new Publisher('test')
      expect(teleport.publisher('test'))
        .toEqual(publisher)
    })
  })

  describe('mappings', () => {
    const teleport = new Teleport()
    it('should throw an error for mapping dependency (useMapping)', async () => {
      expect(() => new Teleport().useMapping(mappingReact))
        .toThrow()
    })
    it('should return an instance of teleport (useLibrary)', async () => {
      teleport.useLibrary(definitions)
      expect(teleport.useMapping(mappingHtml))
        .toEqual(teleport)
    })
    it('should return an instance of teleport / mapping extension (useMapping)', async () => {
      teleport.useMapping(mappingHtml)
      expect(teleport.useMapping(mappingReact))
        .toEqual(teleport)
    })
    it('should return a mapping (mapping)', () => {
      expect(teleport.mapping('teleport-elements-core-react').name)
        .toEqual('teleport-elements-core-react')
    })
  })

  describe('plugins', () => {
    const teleport = new Teleport()
    it('should throw an unvalid plugin error (usePlugin)', () => {
      const unvalidPlugin = { type: 'unvalid' }
      expect(() => teleport.usePlugin(unvalidPlugin))
        .toThrow()
    })
    it('should return an instance of teleport (use with definitions)', async () => {
      expect(await teleport.use(definitions))
        .toEqual(teleport)
    })
    it('should return an instance of teleport (use with mapping)', async () => {
      expect(await teleport.use(mappingHtml))
        .toEqual(teleport)
    })
  })

  describe('target', () => {
    const teleport = new Teleport()
    it('should return undefined (target)', () => {
      expect(() => teleport.target('test'))
        .toThrow()
    })

    it('should return a target target (target)', () => {
      teleport.useLibrary(definitions)
      teleport.useMapping(mappingHtml)
      expect(teleport.target(mappingHtml.target))
        .toBeInstanceOf(Target)
    })
  })
})
