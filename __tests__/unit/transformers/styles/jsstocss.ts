import styleTransformers from '../../../../src/transformers/styles'

const { generateClassName, stylesheet } = styleTransformers.jsstocss
const style = {
  button: {
    color: 'red',
  },
}

describe('jsstocss', () => {
  it('should return the key attribute (generateClassName)', () => {
    expect(generateClassName({ key: 'test' })).toBe('test')
  })

  it('should return the key attribute (generateClassName)', () => {
    expect(stylesheet(style).classNames).toEqual({ button: 'button' })
  })
})
