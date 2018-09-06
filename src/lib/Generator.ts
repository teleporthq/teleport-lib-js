import Target from './Target'
import ComponentGenerator from './Generator/Component'
import ProjectGenerator from './Generator/Project'
import Renderer from './Generator/Renderer'
import FileSet from './Generator/FileSet'
import { Component, Project, ProjectGeneratorOptions, ComponentGeneratorOptions } from '../types'

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

  public generateComponent(component: Component, options: ComponentGeneratorOptions): FileSet {
    return this.componentGenerator.generate(component, options)
  }

  public generateProject(project: Project, options: ProjectGeneratorOptions): FileSet {
    return this.projectGenerator.generate(project, options)
  }
}
