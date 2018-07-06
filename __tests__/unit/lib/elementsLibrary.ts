import ElementsLibrary from '../../../src/lib/ElementsLibrary'
import Target from '../../../src/lib/Target'
import getFromLocal from '../utils/getFromLocal'
import { LibraryDefinition, GuiData } from '../../../src/types'

const definitions: LibraryDefinition = getFromLocal('elements/teleport-elements-core.json')
const guiPlugin: GuiData = getFromLocal('gui/teleport-elements-core-gui.json')
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

  it('should throw incompatible gui plugins (useGui)', () => {
    const alteredGuiPlugin = Object.assign(guiPlugin, { library: 'wrongName' })
    expect(() => elementsLibrary.useGui(alteredGuiPlugin)).toThrow()
  })

  it('should throw missing-elements error(useGui)', () => {
    const alteredGuiPlugin = Object.assign(guiPlugin)
    delete alteredGuiPlugin.elements

    expect(() => elementsLibrary.useGui({} as GuiData)).toThrow()
  })
})
