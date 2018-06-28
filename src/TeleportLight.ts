import ElementsLibrary from './lib/ElementsLibrary'
import Target from './lib/Target'
import Generator from './lib/Generator'
import { LibraryDefinition, Mapping } from './types'
import ElementsLibraryTargetMapping from './lib/ElementsLibraryTargetMapping'

export default class TeleportLight {
  public elementsLibrary: ElementsLibrary
  public mappings: {
    [key: string]: ElementsLibraryTargetMapping
  } = {}
  public target: string
  public generator: Generator

  constructor(library: LibraryDefinition, mappings: Mapping | Mapping[], generator: Generator) {
    this.setLibrary(library)
    this.setMappings(mappings)
    this.setGenerator(generator)
  }

  public setLibrary(library) {
    if (this.elementsLibrary) throw new Error(`Library is already set: ${library.name}`)

    this.elementsLibrary = new ElementsLibrary(library)
  }

  public setMappings(mappings) {
    let maps = null
    for (const mapping of mappings) {
      const targetMapping = new ElementsLibraryTargetMapping(mapping, this)

      // do not allow mapping override
      if (this.mappings[targetMapping.name]) throw new Error(`Mapping ${targetMapping.name} is already set`)

      // check library dependency
      if (this.elementsLibrary.name !== targetMapping.library)
        throw new Error(`\`this.elementsLibrary.name\` mapping depends on \`this.elementsLibrary.name\` library`)

      // check mapping dependency
      if (targetMapping.extends) {
        if (!this.mappings[targetMapping.extends as string])
          throw new Error(`\`${targetMapping.name}\` mapping extends a missing mapping (${targetMapping.extends})`)

        // extend
        maps = {
          ...this.mappings[targetMapping.extends as string],
          ...targetMapping.maps,
        }
      }

      this.mappings[targetMapping.name] = maps || targetMapping.maps
      this.setTarget(targetMapping.target)
    }
  }

  public mapping(str: string) {
    // compatibility placeholder with the main class
  }

  private setTarget(target) {
    this.target = target
  }

  private setGenerator(generator: Generator) {
    if (generator.targetName !== this.target) {
      throw new Error(`The mapping target \`${this.target}\` does not match with the generator target \`${generator.targetName}\``)
    }
    generator.setTarget(new Target(this.target))
    this.generator = generator
  }
}
