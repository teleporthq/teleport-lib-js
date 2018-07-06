import { Project } from '../../types'
import Generator from '../Generator'
import FileSet from './FileSet'
import { Options } from 'prettier'

export default class ProjectGenerator {
  public generator: Generator

  constructor(generator: Generator) {
    this.generator = generator
  }

  public generate(project: Project, options?: { prettier: Options }): FileSet {
    throw new Error("PROJECT GENERATOR'S GENERATE METHOD SHOULD NOT BE INVOKED DIRECTLY! Please use a target specific generator")
  }
}
