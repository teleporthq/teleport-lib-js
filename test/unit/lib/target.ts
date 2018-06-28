import Generator from '../../../src/lib/Generator'
import Teleport from '../../../src/Teleport'
import Target from '../../../src/lib/Target'
import ElementsLibraryTargetMapping from '../../../src/lib/ElementsLibraryTargetMapping'
import getFromLocal from '../utils/getFromLocal'
import { Mapping } from '../../../src/types'

const name = 'test'
const mapping: Mapping = getFromLocal('mappings/teleport-mapping-html.json')

let target: Target

beforeEach(() => {
  target = new Target(name)
})

describe('Target', () => {
  it('should return the correct name', () => {
    expect(target.name).toBe(name)
  })

  it('should throw a "no generator registered" error', () => {
    expect(() => target.generator).toThrow(`No generator registered for target ${name}`)
  })

  describe('generator', () => {
    it('should be a Generator instance (target.generator)', () => {
      const generator = new Generator('name', 'targetName')
      target.setGenerator(generator)
      expect(target.generator).toBeInstanceOf(Generator)
    })

    it('should throw a "already registered" error', () => {
      const generator = new Generator('name', 'targetName')
      target.setGenerator(generator)
      expect(() => target.setGenerator(generator)).toThrow(`A Generator for target ${name} is already registered`)
    })
  })

  describe('mapping', () => {
    it('should return a mapping (mapping, mapLibrary)', () => {
      const elementsTargetMapping = new ElementsLibraryTargetMapping(mapping, new Teleport())
      target.useMapping(elementsTargetMapping)
      expect(target.mapping(elementsTargetMapping.name)).toEqual(elementsTargetMapping)
      expect(target.mapLibrary(elementsTargetMapping.library as string)).toEqual(elementsTargetMapping)
    })

    it('should return null (map)', () => {
      expect(target.map('test', 'test')).toBe(null)
    })

    it('should return the mapping of an element (map)', () => {
      const elementsTargetMapping = new ElementsLibraryTargetMapping(mapping, new Teleport())
      const testElement = Object.keys(elementsTargetMapping.maps)[0]
      const { library } = elementsTargetMapping
      target.useMapping(elementsTargetMapping)
      expect(target.map(library as string, testElement)).toEqual(elementsTargetMapping.maps[testElement])
    })
  })
})
