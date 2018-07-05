import Generator from '../Generator'
import FileSet from './FileSet'

export default class ComponentGenerator {
  public generator: Generator

  constructor(generator: Generator) {
    this.generator = generator
  }

  public generate<T, U>(component: T, options: U): FileSet {
    throw new Error("COMPONENT GENERATOR'S GENERATE METHOD SHOULD NOT BE INVOKED DIRECTLY! Please use a target specific generator")
  }
}
