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
  components?: {
    [key: string]: Component
  }
  pages?: {
    [key: string]: Page
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

export interface ElementMapping {
  type: string
  source: string
  defaultImport?: boolean
}

export interface ProjectGeneratorOptions {
  componentsPath?: string
  pagesPath?: string
  assetsPath?: string
  assetsUrl?: string
  generatePackageFile?: boolean
  renderer?: string
}

export interface ComponentGeneratorOptions {
  isPage?: boolean
  componentsPath?: string
  pagesPath?: string
  assetsPath?: string
  assetsUrl?: string
  renderer?: string
}
