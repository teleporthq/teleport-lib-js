import FileSet from '../../../../src/lib/Generator/FileSet'

let fileSet: FileSet

beforeEach(() => {
  fileSet = new FileSet()
})

describe('FileSet', () => {
  it('should add a file (addFile)', () => {
    fileSet.addFile('test', 'test')

    expect(fileSet.getFiles()).toEqual({ test: 'test' })

    expect(fileSet.getFileNames()).toEqual(['test'])

    expect(fileSet.getContent('test')).toEqual('test')
  })
})
