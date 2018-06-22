import * as Promise from "bluebird"
import * as isUrl from 'is-url'
import * as fetch from 'isomorphic-fetch'

import Target from './lib/Target'
import Generator from './lib/Generator'
import Publisher from './lib/Publisher'
import ElementsLibrary, { LibraryDefinition } from './lib/ElementsLibrary'
import ElementsLibraryTargetMapping from './lib/ElementsLibraryTargetMapping'
import transformers from './transformers'

let fs = null
if (typeof window === 'undefined') {
  // tslint:disable-next-line:no-var-requires
  fs = require('fs')
}

class TeleportLib {
  public libraries: object = {}
  public mappings: object = {}
  public targets: object = {}
  public generators: object = {}
  public publishers: object = {}
  public transformers: any = transformers

  // ------------------------------------------------------------
  // generic functions
  // ------------------------------------------------------------

  public async readPluginDefinitionFromFile(path: string): Promise<any> {
    if (typeof window !== 'undefined')
      throw new Error('reading from files can only be used when lib is used in Node, not within a browser')

    if (!fs.existsSync(path))
      throw new Error(`path \`${path}\` does not exist`)

    return new Promise((resolve, reject) => {
      try {
        const content = fs.readFileSync(path)
        const json = JSON.parse(content)
        resolve(json)
      } catch (error) {
        reject(error)
      }
    })
  }

  public async readPluginDefinitionFromUrl(url: string) {
    try {
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

  // ------------------------------------------------------------
  // plugins
  // ------------------------------------------------------------

  public async use(plugin: object | string): Promise<void> {
    switch (typeof plugin) {
      case 'string':
        if (isUrl(plugin)) {
          this.usePlugin(await this.readPluginDefinitionFromUrl(plugin as string))
        } else {
          this.usePlugin(await this.readPluginDefinitionFromFile(plugin as string))
        }
        // else {
        //   console.log('')
        //   // tslint:disable-next-line:max-line-length
        //   this.usePlugin(await this.readPluginDefinitionFromUrl(`https://storage.googleapis.com/teleport-definitions/${plugin}.json`))
        //   // throw new Error(`plugin sent as string is neither a valid url, nor a file: ${plugin}`)
        // }
        break
      case 'object':
        if (Array.isArray(plugin)) {
          await Promise.mapSeries(plugin, async (pluginItem): Promise<any> => {
            return await this.use(pluginItem)
          })
        } else {
          this.usePlugin(plugin as object)
        }
        break
    }
    // why?
    return
  }

  public usePlugin(pluginData: object): void {
    switch ((pluginData as any).type) {
      case 'library':
        this.useLibrary(pluginData)
        break
      case 'mapping':
        this.useMapping(pluginData)
        break
      case 'generator':
        this.useGenerator(pluginData as Generator)
        break
      case 'publisher':
        this.usePublisher(pluginData as Publisher)
        break
      case 'gui':
        this.useGui(pluginData)
        break
      default:
        console.error('unrecognised plugin type:', pluginData)
    }
  }

  // ------------------------------------------------------------
  // libraries
  // ------------------------------------------------------------

  public useLibrary(libraryDefinition: LibraryDefinition): TeleportLib {
    const library = new ElementsLibrary(libraryDefinition)
    this.libraries[library.name] = library
    return this
  }

  public library(libraryName: string): ElementsLibrary | null | undefined {
    return this.libraries[libraryName]
  }

  // ------------------------------------------------------------
  // mappings
  // ------------------------------------------------------------

  public useMapping(mappingData: object): TeleportLib {
    const map = new ElementsLibraryTargetMapping(mappingData)

    this.mappings[map.name] = map

    if (! this.targets[(map.target as string)]) {
      this.useTarget(map.target as string)
    }

    this.target(map.target as string).useMapping(map)
    // if (this.libraries[map.library]) console.error(` lib ${map.library} does not exist`)
    this.library(map.library as string).useMapping(map)
    return this
  }

  public mapping(mappingName: string): ElementsLibraryTargetMapping | null | undefined {
    return this.mappings[mappingName]
  }

  public map(targetName: string, source: string, type: string): object {
    const target = this.target(targetName)
    if (! target) return null

    return target.map(source, type)
  }

  // ------------------------------------------------------------
  // targets
  // ------------------------------------------------------------

  public useTarget(targetName: string): TeleportLib {
    if (this.targets[targetName]) throw new Error(`Target ${targetName} is already registered`)

    this.targets[targetName] = new Target(targetName)
    return this
  }

  public target(targetName: string): Target | null | undefined {
    if (! this.targets[targetName]) throw new Error(`No target named '${targetName}' exists.
    Did you register a mapping or a generator for this target?`)
    return this.targets[targetName]
  }

  // ------------------------------------------------------------
  // generators
  // ------------------------------------------------------------

  public useGenerator(generator: Generator): TeleportLib {
    if (! this.targets[generator.targetName]) {
      this.useTarget(generator.targetName)
    }

    const target = this.target(generator.targetName)
    generator.setTarget(target)
    target.setGenerator(generator)

    this.generators[generator.name] = generator
    return this
  }

  public generator(generatorName: string): Generator | null | undefined {
    return this.generators[generatorName]
  }

  // ------------------------------------------------------------
  // generators
  // ------------------------------------------------------------
  public usePublisher(publisher: Publisher): TeleportLib {
    this.publishers[publisher.name] = publisher
    return this
  }

  public publisher(publisherName: string): Publisher | null | undefined {
    return this.publishers[publisherName]
  }

  public useGui(guiData: object): void {
    const { library: libraryName } = guiData
    const library = this.library(libraryName)

    if (!library) {
      return console.error(`Library ${libraryName} was not found for gui package ${guiData.name}`)
    }

    library.useGui(guiData)
  }
}

export default new TeleportLib()

export { default as Generator } from './lib/Generator'
export { default as Publisher } from './lib/Publisher'
export { default as ComponentGenerator } from './lib/Generator/Component'
export { default as ProjectGenerator } from './lib/Generator/Project'
export { default as FileSet } from './lib/Generator/FileSet'
