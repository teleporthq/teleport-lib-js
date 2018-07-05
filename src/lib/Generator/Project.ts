import Generator from '../Generator'
import FileSet from './FileSet'

export default class ProjectGenerator {
  public generator: Generator

  constructor(generator: Generator) {
    this.generator = generator
  }

  public generate<T, U>(project: T, options: U): FileSet {
    throw new Error("PROJECT GENERATOR'S GENERATE METHOD SHOULD NOT BE INVOKED DIRECTLY! Please use a target specific generator")
  }
}
