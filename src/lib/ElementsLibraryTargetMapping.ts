import * as fs from 'fs-jetpack'
import * as isUrl from 'is-url'
import fetch from 'node-fetch'
import Target from './Target'
import ElementsLibrary from './ElementsLibrary'
import TeleportLib from '../index'

export default class ElementsLibraryTargetMapping {
  public name: string
  public version: string
  public type: string
  public library: string | ElementsLibrary
  public target: string | Target
  public extends: string | ElementsLibraryTargetMapping
  public maps: object = {}

  constructor (libraryMappingDefinition: object) {
    Object.assign(this, libraryMappingDefinition)
  }

  /**
   * sets the target of the current mapping
   * @param target
   */
  public setTarget(target: Target): void {
    this.target = target

    // computed the extended map if there is one
    if (this.extends) {
      const extendedMapping = TeleportLib.mapping(this.extends as string)
      // tslint:disable-next-line:max-line-length
      if (! extendedMapping) throw new Error(`Mapping '${this.name}' depends on '${this.extends}' which was not yet registered for target '${this.target.name}' Please register it before the current one`)

      this.extends = extendedMapping

      this.maps = {
        ...this.extends.maps,
        ...this.maps
      }
    }
  }

  /**
   * sets the libraryb if the current mapping
   * @param library
   */
  public setLibrary(library: ElementsLibrary): void {
    this.library = library
  }

  /**
   * applies data from a generic object
   * @param libData
   */
  private applyData(libData: object): void {
    Object.assign(this, libData)
  }

  /**
   * retrieves the mapping of a specific element for the current target mapping
   * @param type
   */
  public map(type: string): object | null {
    return this.maps[type]
  }
}
