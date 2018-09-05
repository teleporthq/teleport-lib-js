import FileSet from './FileSet'
import Target from '../Target'
import { ComponentGeneratorOptions } from '../../types'

export default class Renderer {
  public renderDependency(libraryName, types, options: ComponentGeneratorOptions) {
    // there can be only one default import;
    // if multiple, the last one will be used;
    // @todo: discuss how to handle the case where multiple default imports are present
    let defaultType = null
    const deconstructedTypes = []
    if (Array.isArray(types) && types.length > 0) {
      types.map((type) => {
        // if the type is a string
        if (typeof type === 'string') {
          deconstructedTypes.push(type)
        } else {
          if (type.defaultImport) {
            defaultType = type.type
          } else {
            deconstructedTypes.push(type.type)
          }
        }
      })
    }

    const importArray = []
    if (defaultType) importArray.push(defaultType)
    if (deconstructedTypes.length > 0) {
      importArray.push(`{ ${deconstructedTypes.join(', ')} }`)
    }

    return `import ${importArray.join(', ')} from '${libraryName}'`
  }

  public render(name: string, content: string, dependencies: any, styles, props, target: Target, options?: ComponentGeneratorOptions): FileSet | null {
    return null
  }
}
