import Target from './Target'
import ComponentGenerator from './Generator/Component'
import ProjectGenerator from './Generator/Project'
import Renderer from './Generator/Renderer'
import FileSet from './Generator/FileSet'

export default class Generator {
  public name: string
  public type: string = 'generator'
  public targetName: string
  public target: Target
  public componentGenerator: ComponentGenerator
  public projectGenerator: ProjectGenerator

  constructor(name: string, targetName: string, componentRenderers?: { [key: string]: Renderer }) {
    this.name = name
    this.targetName = targetName

    this.componentGenerator = new ComponentGenerator(this, componentRenderers)
    this.projectGenerator = new ProjectGenerator(this, this.componentGenerator)
  }

  public setTarget(target: Target): void {
    this.target = target
  }

  public generateComponent<T, U>(component: T, options: U): FileSet {
    return this.componentGenerator.generate(component, options)
  }

  public generateProject(component: any, options: any): FileSet {
    return this.projectGenerator.generate(component, options)
  }
}
