import Teleport from '../../src'
import Publisher from '../../src/lib/Publisher'
import Generator from '../../src/lib/Generator'
import ElementsLibrary from '../../src/lib/ElementsLibrary'
import { Mapping, LibraryDefinition } from '../../src/types'
import Target from '../../src/lib/Target'
import config from '../config'
import getFromRepo from './utils/getFromRepo'
import getFromLocal from './utils/getFromLocal'
declare const __DATA__: string

// local
const localDefinitions:LibraryDefinition = getFromLocal('elements/teleport-elements-core.json')

// remote
const invalidUrl = `${config.coreRepo}invalidUrl`
const definitionsUrl = `${config.coreRepo}definitions.json`

let definitions: LibraryDefinition
let mappingHtml: Mapping
let mappingReact: Mapping

// we download some files, let's give it some time
jest.setTimeout(15000)

// tests
beforeAll(async () => {
  definitions = await getFromRepo('definitions.json')
  mappingHtml = await getFromRepo('mapping-html.json')
  mappingReact = await getFromRepo('mapping-react.json')
})

describe('Teleport', () => {
  describe('generator', () => {
    const teleport = new Teleport()
    teleport.useGenerator(new Generator('test', 'test'))
    it('should return a generator', () => {
      expect(teleport.generator('test'))
        .toBeInstanceOf(Generator)
    })
  })

  describe('gui', () => {
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

  describe('libraries', () => {
    const teleport = new Teleport()
    it('should return an instance of teleport (useLibrary)', async () => {
      expect(teleport.useLibrary(localDefinitions))
        .toEqual(teleport)
    })
    it('should return a library definition', async () => {
      const { name } = localDefinitions
      expect(teleport.library(name).name)
        .toEqual(name)
    })
    it('should trhow an library-has-not-been-loaded error', async () => {
      expect(() => teleport.library('test'))
        .toThrowError()
    })
  })

  describe('publishers', () => {
    const teleport = new Teleport()
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
    it('should return a map (map)', () => {
      const mapping = teleport.map('html', 'teleport-elements-core', 'View')
      expect(mapping)
        .toEqual({ type: 'div' })
    })
  })

  describe('plugins', () => {
    it('should throw an unvalid plugin error (usePlugin)', () => {
      const unvalidPlugin = { type: 'unvalid' }

      expect(() => new Teleport().usePlugin(unvalidPlugin))
        .toThrow()
    })
    it('should throw a not-an-url error (use)', async () => {
      expect(new Teleport().use('this is not an url'))
        .rejects.toThrowError()
      })
    })
    it('should return an instance of teleport (use with definitions)', async () => {
      const teleport = new Teleport()

      expect(await teleport.use(definitions))
        .toEqual(teleport)
    })
    it('should return an instance of teleport (use with definitions)', async () => {
      const teleport = new Teleport()
      
      expect(await teleport.use(definitions))
        .toEqual(teleport)
    })
    it('should return an instance of teleport (use with mapping)', async () => {
      const teleport = new Teleport()
      await teleport.use(definitions)

      expect(await teleport.use(mappingHtml))
        .toEqual(teleport)
    })
    it('should return an instance of teleport (use with array)', async () => {
      const teleport = new Teleport()
      expect(await teleport.use([definitions, mappingHtml]))
        .toEqual(teleport)
    })
    it('should return an instance of teleport (use with Publisher)', async () => {
      const teleport = new Teleport()
      expect(await teleport.use(new Publisher('test')))
        .toEqual(teleport)
    })
    it('should return an instance of teleport (use with Generator)', async () => {
      const teleport = new Teleport()
      expect(await teleport.use(new Generator('test', 'test')))
        .toEqual(teleport)
    })
    it('should return an instance of teleport (use with mapping)', async () => {
      const teleport = new Teleport()
      expect(await teleport.use(definitionsUrl))
        .toEqual(teleport)
    })
  })

  describe('target', () => {
    it('should return undefined (target)', () => {
      expect(() => new Teleport().target('test'))
        .toThrow()
    })
    it('should return a target target (target)', () => {
      const teleport = new Teleport()
      teleport.useLibrary(definitions)
      teleport.useMapping(mappingHtml)
      expect(teleport.target(mappingHtml.target))
        .toBeInstanceOf(Target)
    })
    it('should return a target target (target)', () => {
      const teleport = new Teleport()
      teleport.useTarget('test')
      expect(() => teleport.useTarget('test'))
        .toThrowError()
    })
  })

  describe('utils', () => {
    it('should throw an generic error(readPluginDefinitionFromUrl)', async () => {
      expect(new Teleport().readPluginDefinitionFromUrl('wrong://'))
        .rejects.toThrow()
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
})
