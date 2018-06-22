import Generator from './Generator'
import ElementsLibraryTargetMapping from './ElementsLibraryTargetMapping'
import ElementsLibrary from './ElementsLibrary'

export default class Target {
  public name: string
  public _generator: Generator

  /**
   * all mappings defined for this target
   */
  public mappings: object = {}

  /**
   * all mappings indexed by their elements library defined for this target
   */
  public mappingsByLibrary: object = {}

  constructor(name: string) {
    this.name = name
  }

  /**
   * sets up a mapping to be used within this target
   * @param mapping the mapping to be used
   */
  public useMapping(mapping: ElementsLibraryTargetMapping): void {
    this.mappings[mapping.name] = mapping
    this.mappingsByLibrary[(mapping.library as ElementsLibrary).name || mapping.library as string] = mapping
    mapping.setTarget(this)
  }

  public setGenerator(generator: Generator): void {
    if (this._generator) throw new Error(`A Generator for target ${this.name} is already registered`)

    this._generator = generator
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
  public map(source: string, type: string): object | null {
    const mapping = this.mapLibrary(source)
    if (!mapping) return null

    return mapping.map(type)
  }

  get generator(): Generator {
    if (! this._generator) throw new Error(`No generator registered for target ${this.name}`)

    return this._generator
  }
}
