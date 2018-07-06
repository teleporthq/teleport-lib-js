import ProjectGenerator from '../../../../src/lib/Generator/Project'
import Generator from '../../../../src/lib/Generator'
import getFromLocal from '../../utils/getFromLocal'

describe('project generator', () => {
  const project = getFromLocal('projects/html.json')
  const generator = new Generator('test', 'test')
  it('should return a Generator (this.generator)', () => {
    expect(new ProjectGenerator(generator).generator).toEqual(generator)
  })
  it('should throw an error: no direct access (generate)', () => {
    expect(() => new ProjectGenerator(generator).generate(project)).toThrowError()
  })
})
