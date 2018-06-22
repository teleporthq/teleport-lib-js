import * as fs from 'fs'
import * as fetch from 'isomorphic-fetch'

import teleport from '../../src'
import Publisher from '../../src/lib/Publisher'
import ElementsLibrary from '../../src/lib/ElementsLibrary'

const invalidPath = 'this/path/does/not/exist'
const validPath = `${__dirname}/data/libraries/teleport-elements-core.json`
const invalidUrl = 'https://gitlab.com/teleporthq/teleport-elements-core/raw/master/definitions'
const validUrl = 'https://gitlab.com/teleporthq/teleport-definitions/raw/master/definitions.json'
const localTestlibraryDefinition = JSON.parse(fs.readFileSync(validPath).toString())

const getCoreLibraryDefinitionFromRepo = async () => {
  try {
    const response = await fetch(validUrl)
    if (response.status !== 200)
      throw new Error(`Could not download ${validUrl}: ${response.statusText}`)

    const data = await response.json()

    if (!data)
      throw new Error(`Could not download ${validUrl}: EMPTY RESPONSE`)

    return data
  } catch (error) {
    throw new Error(error)
  }
}

describe('Teleport', () => {
  describe('utils', () => {
    it('should reject because of invalid plugin path (readPluginDefinitionFromFile)', () => {
      expect(teleport.readPluginDefinitionFromFile(invalidPath))
        .rejects.toThrow(`path \`this/path/does/not/exist\` does not exist`)
    })

    it('should return a definition object (readPluginDefinitionFromFile)', async () => {
      expect(await teleport.readPluginDefinitionFromFile(validPath)).toEqual(localTestlibraryDefinition)
    })

    it('should throw an error for invalid url (readPluginDefinitionFromUrl)', async () => {
      expect(teleport.readPluginDefinitionFromUrl(invalidUrl))
        .rejects.toThrow()
    })

    it('should return a definition object (readPluginDefinitionFromUrl)', async () => {
      expect(await teleport.readPluginDefinitionFromUrl(validUrl))
        .toEqual(await getCoreLibraryDefinitionFromRepo())
    })
  })

  describe('libraries', () => {
    it('should return an instance of teleport (useLibrary)', async () => {
      expect(teleport.useLibrary(new ElementsLibrary(localTestlibraryDefinition)))
        .toEqual(teleport)
    })

    it('should return a library definition', async () => {
      const { name } = localTestlibraryDefinition
      expect(teleport.library(name).name)
        .toEqual(name)
    })
  })
  // libraries

  describe('publisher', () => {
    it('should return an instance of teleport (usePublisher)', async () => {
      expect(teleport.usePublisher(new Publisher('test')))
        .toEqual(teleport)
    })
    it('should return a Publisher (publisher)', async () => {
      const publisher = new Publisher('test')
      teleport.usePublisher(new Publisher('test'))
      expect(teleport.publisher('test'))
        .toEqual(publisher)
    })
  })
})
