import Generator from '../Generator'

export default class ProjectGenerator {
  public generator: Generator

  constructor(generator: Generator) {
    this.generator = generator
  }

  public generate(project: any, options: any): string {

    // tslint:disable-next-line:max-line-length
    throw new Error("PROJECT GENERATOR'S GENERATE METHOD SHOULD NOT BE INVOKED DIRECTLY! Please use a target specific generator")
  }
}
