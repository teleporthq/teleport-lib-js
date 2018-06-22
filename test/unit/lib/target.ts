import Generator from '../../../src/lib/Generator'
import Target from '../../../src/lib/Target'

describe('Target', () => {
  const name = 'test'
  const generator = new Generator('name', 'targetName')
  const target = new Target(name)

  it('should return the correct name', () => {
    expect(target.name).toBe(name)
  })

  it('should throw a "no generator registered" error', () => {
    expect(() => target.generator).toThrow(`No generator registered for target ${name}`)
  })

  it('should be a Generator instance (target.generator)', () => {
    target.setGenerator(generator)
    expect(target.generator).toBeInstanceOf(Generator)
  })

  it('should throw a "already registered" error', () => {
    expect(() => target.setGenerator(generator)).toThrow(`A Generator for target ${name} is already registered`)
  })
})
