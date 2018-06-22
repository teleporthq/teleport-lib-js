import Publisher from '../../../src/lib/Publisher'

describe('Publisher', () => {
  const name = 'test'
  const publisher = new Publisher(name)

  it('should return the correct name', () => {
    expect(publisher.name).toBe(name)
  })

  it('should return the correct type', () => {
    expect(publisher.type).toBe('publisher')
  })
})
