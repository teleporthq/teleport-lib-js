import Generator from '../Generator'
import { Project, ProjectGeneratorOptions, ComponentGeneratorOptions } from '../../types'
import FileSet from './FileSet'
import ComponentGenerator from './Component'

export default class ProjectGenerator {
  public generator: Generator
  public componentGenerator: ComponentGenerator

  constructor(generator: Generator, componentGenerator: ComponentGenerator) {
    this.generator = generator
    this.componentGenerator = componentGenerator
  }

  public generateComponents(project: Project, options?: ComponentGeneratorOptions): FileSet {
    const { components } = project
    const componentsPath = options && options.componentsPath ? options.componentsPath : './components'
    const assetsPath = options && options.assetsPath ? options.assetsPath : './static'
    const assetsUrl = options && options.assetsUrl ? options.assetsUrl : '/static'

    const generatorOptions: ComponentGeneratorOptions = {
      assetsPath,
      assetsUrl,
      componentsPath,
      renderer: options.renderer,
    }
    if (options && options.target) {
      Object.assign(generatorOptions, { target: options.target })
    }

    const result = new FileSet()

    Object.keys(components).map((componentName) => {
      const component = components[componentName]
      const componentResults = this.componentGenerator.generate(component, generatorOptions)

      componentResults.getFileNames().map(
        (fileName: string): void => {
          result.addFile(`${componentsPath}/${fileName}`, componentResults.getContent(fileName))
        }
      )
    })

    return result
  }

  public generatePages(project: Project, options?: ComponentGeneratorOptions): FileSet {
    const { pages } = project
    const componentsPath = options && options.componentsPath ? options.componentsPath : './components'
    const pagesPath = options && options.pagesPath ? options.pagesPath : './pages'
    const assetsPath = options && options.assetsPath ? options.assetsPath : './static'
    const assetsUrl = options && options.assetsUrl ? options.assetsUrl : '/static'

    const result = new FileSet()

    const generatorOptions: ComponentGeneratorOptions = {
      assetsPath,
      assetsUrl,
      componentsPath,
      isPage: true,
      renderer: options.renderer,
    }
    if (options && options.target) {
      Object.assign(generatorOptions, { target: options.target })
    }

    if (pages) {
      Object.keys(pages).map((pageName) => {
        const page = pages[pageName]
        const pageResults = this.componentGenerator.generate(page, generatorOptions)
        pageResults.getFileNames().map((fileName) => {
          result.addFile(`${pagesPath}/${fileName}`, pageResults.getContent(fileName))
        })
      })
    }

    return result
  }

  public generatePackage(project: Project, options?: ProjectGeneratorOptions): FileSet {
    const result = new FileSet()

    const pkg = {
      author: 'Unknown',
      dependencies: {
        react: '^16.4.2',
        'react-dom': '^16.4.2',
        'react-scripts': '1.1.5',
      },
      description: '',
      license: 'ISC',
      name: project.slug,
      scripts: {
        build: 'react-scripts build',
        eject: 'react-scripts eject',
        start: 'react-scripts start',
        test: 'react-scripts test --env=jsdom',
      },
      version: '0.0.1',
    }

    result.addFile('package.json', JSON.stringify(pkg, null, 2))
    return result
  }

  public generate(project: Project, options?: ProjectGeneratorOptions): FileSet {
    const result = new FileSet()

    const components = this.generateComponents(project, options)
    result.merge(components)

    const pages = this.generatePages(project, options)
    result.merge(pages)

    if (options && options.generatePackageFile) {
      result.merge(this.generatePackage(project, options))
    }

    return result
  }
}
