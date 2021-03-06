import Target from '../lib/Target'

export interface Page {
  name: string
  content: Content
  url?: string
  children?: Component[] | string
}

export interface ComponentEditableProp {
  type: string
  inputType?: string
  inputConfig?: any
  displayName?: string
  defaultValue?: string
  values?: any
}

export interface Component {
  name: string
  content: Content
  children?: Component[] | string
  editableProps?: {
    [key: string]: ComponentEditableProp
  }
}

export interface Content {
  type: string
  source: string
  name: string
  style: {
    [key: string]: string
  }
}

export interface ProjectTarget {
  [targetOption: string]: any
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
  targets?: {
    [targetName: string]: ProjectTarget
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
  target?: Target
}

export interface ComponentGeneratorOptions {
  isPage?: boolean
  componentsPath?: string
  pagesPath?: string
  assetsPath?: string
  assetsUrl?: string
  renderer?: string
  target?: Target
}
