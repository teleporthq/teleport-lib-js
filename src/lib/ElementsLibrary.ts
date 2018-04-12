import * as fs from 'fs-jetpack'
import * as isUrl from 'is-url'
import fetch from 'node-fetch'
import ElementsLibraryTargetMapping from './ElementsLibraryTargetMapping'
import Target from './Target'

export default class ElementsLibrary {
  public name: string
  public version: string
  public type: string
  public elements: any
  public mappings: object = {}
  public targets: object = {}
  public targetMapping: object = {}

  constructor (libraryDefinition: object) {
    Object.assign(this, libraryDefinition)
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
    const target = (mapping.target as Target)
    this.targets[target.name] = target
    this.targetMapping[target.name] = mapping
    mapping.setLibrary(this)
  }

  /**
   * applies data from a generic object to the current library
   * @param libData
   */
  private applyData(libData: object): void {
    Object.assign(this, libData)
  }

  /**
   * retrieves a target for the current elements library
   * @param targetName
   */
  public target(targetName: string): Target | null {
    return this.targets[targetName]
  }

  /**
   * retrieves all mappings of the current library for a target
   * @param targetName
   */
  public mapping(targetName: string): ElementsLibraryTargetMapping | null {
    return this.targetMapping[targetName]
  }
}
