import ElementsLibrary from '../../../src/lib/ElementsLibrary'
import Target from '../../../src/lib/Target'
import getFromLocal from '../utils/getFromLocal'
import { LibraryDefinition } from '../../../src/types'

const definitions: LibraryDefinition = getFromLocal('elements/teleport-elements-core.json')
const target = new Target('test')
let elementsLibrary: ElementsLibrary

beforeEach(() => {
  elementsLibrary = new ElementsLibrary(definitions)
})

describe('ElementsLibrary', () => {
  it('should return an element (element)', () => {
    const elementKey = Object.keys(definitions.elements)[0]
    expect(elementsLibrary.element(elementKey)).toEqual(definitions.elements[elementKey])
  })

  it('should return a target (target)', () => {
    elementsLibrary.targets['test'] = target
    expect(elementsLibrary.target('test')).toEqual(target)
  })
})
