import Target from './Target'
import ComponentGenerator from './Generator/Component'
import ProjectGenerator from './Generator/Project'

export default class Generator {
  public name: string
  public type: string = 'generator'
  public targetName: string
  public target: Target
  public componentGenerator: ComponentGenerator
  public projectGenerator: ProjectGenerator

  constructor(name: string, targetName: string) {
    this.name = name
    this.targetName = targetName
  }

  public setTarget(target: Target): void {
    this.target = target
  }
}
