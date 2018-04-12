import { expect, assert } from 'chai'
import 'mocha'

import teleport from '../index'

const core = {
  name: "teleport-elements-core",
  version: "0.0.1",
  type: "library",
  elements: {
    View: {
      defaults: {
        style: {
          display: "flex",
          backgroundColor: "#c0c0c0",
          width: 100,
          height: 50
        }
      }
    }
  }
}

const coreReact = {
  name: "teleport-elements-core-react",
  version: "0.0.1",
  type: "mapping",
  library: "teleport-elements-core",
  target: "react",
  map: {
    View: {
      type: "div"
    }
  }
}

describe('Generic', () =>  {
  const existingFile = './src/__test__/definitions/teleport-elements-core.json'
  const missingFile = './src/__test__/definitions/teleport-elements-core_wrong.json'
  // tslint:disable-next-line:max-line-length
  const correctUrl = 'https://storage.googleapis.com/teleport-definitions/teleport-elements-core/teleport-elements-core-react-native.json'
  // tslint:disable-next-line:max-line-length
  const incorrentUrl = 'https://storage.googleapis.com/teleport-definitions/teleport-elements-core/teleport-elements-core-react-native__wrong.json'
  const notAnUrl = 'aaaa'

  it(`readPluginDefinitionFromFile throws an error on a invalid file`, async () => {
    const result = await teleport.readPluginDefinitionFromFile(missingFile)
    assert.isUndefined(result)
  })

  it(`readPluginDefinitionFromFile returns an object=`, async () => {
    const result = await teleport.readPluginDefinitionFromFile(existingFile)
    assert.isObject(result)
  })

  it(`readPluginDefinitionFromUrl throws an error on a missing url`, async () => {
    return new Promise((resolve, reject) => {
      teleport.readPluginDefinitionFromUrl(incorrentUrl)
        .then(result => { console.log('resp: ', result); reject('got resp ') })
        .catch(resolve)
    })
  })

  it(`readPluginDefinitionFromUrl returns an object`, async () => {
    const result = await teleport.readPluginDefinitionFromUrl(correctUrl)
    assert.isObject(result)
  })

  it('teleport.use should return a promise', () => {
    expect(teleport.use(core)).to.be.a('promise')
  })
})
