// tslint:disable-next-line:no-submodule-imports
import union from 'lodash/union'
import Generator from '../Generator'
import FileSet from './FileSet'
import { cleanPath, getRelativePath, findNextIndexedKeyInObject } from '../utils'
import { ComponentGeneratorOptions } from '../../types'
import Renderer from './Renderer'

const defaultOptions = {
  assetsPath: './static',
  assetsUrl: '/static',
  componentsPath: './components',
  isPage: false,
  pagesPath: './pages',
}

export default class ComponentGenerator {
  public generator: Generator

  public renderers: {
    [key: string]: Renderer
  }

  constructor(generator: Generator, renderers: { [key: string]: Renderer }) {
    this.generator = generator
    this.renderers = renderers
  }

  public registerRenderer(name: string, renderer: Renderer): void {
    if (this.renderers[name]) {
      // tslint:disable-next-line:no-console
      console.warn(`Renderer ${name} is already registered on ${this.generator.name} ComponentGenerator`)
      return
    }

    this.renderers[name] = renderer
  }

  public processStyles(componentContent: any, styles: any = {}): any {
    /** duplicate the content, to avoid modifying by reference */
    const content = JSON.parse(JSON.stringify(componentContent))

    /** if there's style info defined, determine a unique identier aka className, and accumulate the definition to the styles object */
    if (content.style) {
      const styleName = content.name || findNextIndexedKeyInObject(styles, content.name || content.type)
      styles[styleName] = content.style
      content.style = [styleName]
    }

    /** if there are children, recurse */
    if (content.children && content.children.length > 0) {
      /** only recurse if the children is not a string */
      if (typeof content.children !== 'string') {
        content.children = content.children.map((child) => {
          const childStyledResults = this.processStyles(child, styles)
          /** ,erge the styles into the accumulator */
          styles = {
            ...styles,
            ...childStyledResults.styles,
          }

          /** only return the content */
          return childStyledResults.content
        })
      }
    }

    return { styles, content }
  }

  public computeDependencies(content: any, options?: ComponentGeneratorOptions): any {
    const dependencies = {}

    const { type, children, props } = content
    let { source } = content

    /** if no source is specified, default to 'components' */
    if (!source) source = 'components'

    if (type) {
      if (source === 'components') {
        const { isPage, pagesPath, componentsPath } = options || defaultOptions

        /** clean the paths by removinf leading and tailing "." and "/" characters */
        const cleanedPages = cleanPath(pagesPath || './pages')
        const cleanedComponents = cleanPath(componentsPath || './components')

        /** calculate the relative path from pages to components */
        const relativePagesToComponentsPath = getRelativePath(cleanedPages, cleanedComponents)

        const componentsRelativePath = isPage ? relativePagesToComponentsPath : '.'

        /** append the componet import to deps as  */
        const componentDependencies = {
          [`${componentsRelativePath}/${type}`]: [
            {
              defaultImport: true,
              type,
            },
          ],
        }

        /** if there are children, recurse */
        if (props && props.children && props.children.length > 0 && typeof props.children !== 'string') {
          const childrenDependenciesArray = props.children.map((child) => {
            return this.computeDependencies(child, options)
          })

          /** merge children depenencies into dependencies accumulator object */
          if (childrenDependenciesArray.length) {
            childrenDependenciesArray.forEach((childrenDependency) => {
              Object.keys(childrenDependency).forEach((childrenDependencyLibrary) => {
                if (!componentDependencies[childrenDependencyLibrary]) componentDependencies[childrenDependencyLibrary] = []

                /** make sure dependencies ar unique  */
                /** @TODO: handle object attribute checking */
                componentDependencies[childrenDependencyLibrary] = union(
                  componentDependencies[childrenDependencyLibrary],
                  childrenDependency[childrenDependencyLibrary]
                )
              })
            })
          }
        }

        return componentDependencies
      }

      /** if it's not a component, read the element's mapping from the target */
      const elementMapping = this.generator.target.map(source, type)

      if (elementMapping) {
        /** if it has a source, it's not a primitive, so need to add the source library to depemdencies */
        if (elementMapping.source) {
          /** if the library is not yet in the dependencies, add it */
          if (!dependencies[elementMapping.source]) dependencies[elementMapping.source] = []

          /** if the type is not yet in the deps for the current library, add it */
          if (dependencies[elementMapping.source].indexOf(elementMapping.type) < 0)
            dependencies[elementMapping.source].push({
              defaultImport: elementMapping.defaultImport,
              type: elementMapping.type,
            })
        }
      }
    }

    /** if there are children, recurse */
    if (children && children.length > 0 && typeof children !== 'string') {
      const childrenDependenciesArray = children.map((child) => this.computeDependencies(child, options))
      if (childrenDependenciesArray.length) {
        childrenDependenciesArray.forEach((childrenDependency) => {
          Object.keys(childrenDependency).forEach((childrenDependencyLibrary) => {
            if (!dependencies[childrenDependencyLibrary]) dependencies[childrenDependencyLibrary] = []

            dependencies[childrenDependencyLibrary] = union(dependencies[childrenDependencyLibrary], childrenDependency[childrenDependencyLibrary])
          })
        })
      }
    }

    return dependencies
  }

  public generate(component: any, options: ComponentGeneratorOptions): FileSet {
    const { name } = component
    let { content } = component

    /** retrieve all dependencies for the current component, by parsing it's content recursively */
    const dependencies = this.computeDependencies(content, options)

    /** retrieve all styles for the current component, by parsing it's content recursively */
    const stylingResults = this.processStyles(content)

    /** split up the response */
    const styles = stylingResults.styles

    /** overwrite the content with the transformed one; stryle objects will now be class names */
    content = stylingResults.content

    const props = component.editableProps ? Object.keys(component.editableProps) : null

    /** determine the renderer to be used */
    let rendererName = options.renderer

    /** if no renderer passed, or the one passed does not exist, use the default one */
    if (!rendererName || !this.renderers[rendererName]) {
      // tslint:disable-next-line:no-console
      console.warn(`${rendererName ? `renderer ${rendererName} is not registered` : 'no renderer sent'}; using default renderer`)
      rendererName = 'default'
    }

    const renderer: Renderer = this.renderers[rendererName] as Renderer

    if (!renderer) {
      // tslint:disable-next-line:no-console
      console.warn(`No renderer found`)
      return
    }

    return renderer.render(name, content, dependencies, styles, props, this.generator.target, options)
  }
}
