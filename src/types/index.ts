export interface Page {
  name: string
  content: Content
  children?: Component[] | string
}

export interface Component {
  name: string
  content: Content
  children?: Component[] | string
}

export interface Content {
  type: string
  source: string
  name: string
  style: {
    [key: string]: string
  }
}

export interface Project {
  name: string
  accountSlug?: string
  slug?: string
  components: {
    [key: string]: Component
  }
}

export interface LibraryDefinition {
  name: string
  version: string
  type: string
  elements: {
    [key: string]: {
      defaults: {
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
