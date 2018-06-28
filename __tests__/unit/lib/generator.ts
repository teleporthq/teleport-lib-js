import Generator from '../../../src/lib/Generator'
import Target from '../../../src/lib/Target'

describe('Generator', () => {
  const name = 'test'
  const targetName = 'test'
  const generator = new Generator(name, targetName)
  const target = new Target('test')

  it('should return the correct name', () => {
    expect(generator.name).toBe(name)
  })

  it('should return a Target instance', () => {
    generator.setTarget(target)
    expect(generator.target).toBeInstanceOf(Target)
  })
})
