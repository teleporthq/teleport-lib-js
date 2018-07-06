import ComponentGenerator from '../../../../src/lib/Generator/Component'
import Generator from '../../../../src/lib/Generator'
import getFromLocal from '../../utils/getFromLocal'

describe('project generator', () => {
  const project = getFromLocal('projects/html.json')
  const generator = new Generator('test', 'test')
  it('should return a Generator (this.generator)', () => {
    expect(new ComponentGenerator(generator).generator).toEqual(generator)
  })
  it('should throw an error: no direct access (generate)', () => {
    expect(() => new ComponentGenerator(generator).generate(project)).toThrowError()
  })
})
