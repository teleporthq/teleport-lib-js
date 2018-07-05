import Generator from './Generator'
import ElementsLibraryTargetMapping from './ElementsLibraryTargetMapping'
import ElementsLibrary from './ElementsLibrary'
import { Mapping } from '../types'

export default class Target {
  public name: string

  /**
   * all mappings defined for this target
   */
  public mappings: {
    [key: string]: ElementsLibraryTargetMapping
  } = {}

  /**
   * all mappings indexed by their elements library defined for this target
   */
  public mappingsByLibrary: {
    [key: string]: ElementsLibraryTargetMapping
  } = {}

  private targetGenerator: Generator

  constructor(name: string) {
    this.name = name
  }

  /**
   * sets up a mapping to be used within this target
   * @param mapping the mapping to be used
   */
  public useMapping(mapping: ElementsLibraryTargetMapping): void {
    this.mappings[mapping.name] = mapping
    this.mappingsByLibrary[(mapping.library as ElementsLibrary).name || (mapping.library as string)] = mapping
    mapping.setTarget(this)
  }

  public setGenerator(generator: Generator): void {
    if (this.targetGenerator) throw new Error(`A Generator for target ${this.name} is already registered`)

    this.targetGenerator = generator
  }

  /**
   * retrieves a mapping by it's name
   * @param mappingName
   */
  public mapping(mappingName: string): ElementsLibraryTargetMapping | undefined {
    return this.mappings[mappingName]
  }

  /**
   * returns the mapping equivalent to an elements library
   * @param libraryName
   */
  public mapLibrary(libraryName: string): ElementsLibraryTargetMapping | null {
    return this.mappingsByLibrary[libraryName]
  }

  /**
   * returns the mapping of an element within the current target
   * @param source source element library
   * @param type name if the element
   */
  public map(source: string, type: string): Mapping | null {
    const mapping = this.mapLibrary(source)
    if (!mapping) return null

    return mapping.map(type)
  }

  get generator(): Generator {
    if (!this.targetGenerator) throw new Error(`No generator registered for target ${this.name}`)

    return this.targetGenerator
  }
}
