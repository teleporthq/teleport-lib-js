export interface LibraryDefinition {
  name: string
  version: string
  type: string
  elements: {
    [key: string]: {
      'defaults': {
        [key: string]: {} | string
      }
    }
  }
}

export interface Mapping {
  name: string
  version: string
  type: 'mapping'
  library: 'string'
  extends?: 'string'
  target: 'string'
  maps?: {
    [key: string]: {
      [key: string]: string
    }
  }
}