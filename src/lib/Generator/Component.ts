import Generator from '../Generator'
import FileSet from './FileSet'
import { Component } from '../../types'
import { Options } from 'prettier'

export default class ComponentGenerator {
  public generator: Generator

  constructor(generator: Generator) {
    this.generator = generator
  }

  public generate(component: Component, options?: { prettier: Options }): FileSet {
    throw new Error("COMPONENT GENERATOR'S GENERATE METHOD SHOULD NOT BE INVOKED DIRECTLY! Please use a target specific generator")
  }
}
