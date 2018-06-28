import Generator from '../Generator'

export default class ComponentGenerator {
  public generator: Generator

  constructor(generator: Generator) {
    this.generator = generator
  }

  public generate(component: any, options: any): string {
    throw new Error("COMPONENT GENERATOR'S GENERATE METHOD SHOULD NOT BE INVOKED DIRECTLY! Please use a target specific generator")
  }
}
