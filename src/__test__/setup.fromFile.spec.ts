import { expect, assert } from 'chai'
import 'mocha'
import * as fs from 'fs-jetpack'

import teleport from '../index'

const coreFile = fs.path('./src/__test__/definitions/teleport-elements-core.json')
const coreReactFile = fs.path('./src/__test__/definitions/teleport-elements-core-react.json')

// tslint:disable-next-line:no-var-requires
const core = require(coreFile)
const coreReact = require(coreReactFile)

describe('Setup From File', () => {
  before(() => {
    return new Promise(resolve => {
      const promises = [
        teleport.use(coreFile),
        teleport.use(coreReactFile)
      ]

      Promise.all(promises).then(() => {
        resolve()
      })
    })
  })

  it ('elements library should be registered', () => {
    expect(teleport.library(core.name).name).to.equal(core.name)
  })

  it ('elements mapping shoult set up a target correctly', () => {
    expect(teleport.target(coreReact.target).name).to.equal(coreReact.target)
  })

  it ('elements library should have a correct target mapping set', () => {
    expect(teleport.library(core.name).target(coreReact.target).name).to.equal(coreReact.target)
  })

  it ('elements library should have the correct target mapping', () => {
    expect(teleport.library(core.name).mapping(coreReact.target).name).to.equal(coreReact.name)
  })

  it ('elements mapping shoult be set up as a mapping within the target correctly', () => {
    expect(teleport.target(coreReact.target).mapping(coreReact.name).name).to.equal(coreReact.name)
  })

  it ('elements mapping shoult point to the correct elements library', () => {
    expect(teleport.target(coreReact.target).mapping(coreReact.name).library.name).to.equal(core.name)
  })
})
