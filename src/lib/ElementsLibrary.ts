import ElementsLibraryTargetMapping from './ElementsLibraryTargetMapping'
import Target from './Target'
import { LibraryDefinition } from '../types'

export default class ElementsLibrary {
  public name: string
  public version: string
  public type: string
  public elements: any
  public mappings: {
    [key: string]: ElementsLibraryTargetMapping
  } = {}
  public targets: {
    [key: string]: Target
  } = {}

  constructor(libraryDefinition: LibraryDefinition) {
    const { name, version, type, elements } = libraryDefinition
    this.name = name
    this.version = version
    this.type = type
    this.elements = elements
  }

  /**
   * retrieves an element by it's name
   * @param name
   */
  public element(name: string): object {
    return this.elements[name]
  }

  /**
   * adds a target mapping to the current library
   * sets up all internal wiring of dependencies between the library,
   * target and mapping
   * @param mapping
   */
  public useMapping(mapping: ElementsLibraryTargetMapping): void {
    this.mappings[mapping.name] = mapping
    const target = mapping.target as Target
    this.targets[target.name] = target
    mapping.setLibrary(this)
  }

  /**
   * retrieves a target for the current elements library
   * @param targetName
   */
  public target(targetName: string): Target | undefined {
    return this.targets[targetName]
  }

  /**
   *
   * @param guiData sets up gui data to be used by the Teleport Playground Inspector
   */
  // @todo should this stay in the core class?
  public useGui(guiData): void {
    if (guiData.library !== this.name) throw new Error(`Library gui ${guiData.library} not compatible with ${this.name}`)

    if (!guiData.elements) throw new Error(`invalid gui defintion for ${this.name}`)

    Object.keys(guiData.elements).map((elementName) => {
      const element = this.elements[elementName]

      if (!element) return

      element.gui = guiData.elements[elementName]
    })
  }

  /**
   * applies data from a generic object to the current library
   * @param libData
   */
  public applyData(libData: object): void {
    Object.assign(this, libData)
  }
}
