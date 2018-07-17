# Teleport

A suite of open-source libraries and tools used by [teleportHQ](https://teleporthq.io/?g), an online platform which simplifies the process of creating, maintaining and publishing user interfaces for desktop and mobile devices.

[![npm](https://img.shields.io/npm/v/@teleporthq/teleport-lib-js.svg)](https://github.com/teleporthq/teleport-lib-js)
[![Build Status](https://travis-ci.com/teleporthq/teleport-lib-js.svg?branch=master)](https://travis-ci.com/teleporthq/teleport-lib-js)
[![Codecov](https://img.shields.io/codecov/c/github/teleporthq/teleport-lib-js.svg)](https://codecov.io/gh/teleporthq/teleport-lib-js)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/208450ec31774771a9935aad67d3f7ab)](https://www.codacy.com/app/Utwo/teleport-lib-js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=teleporthq/teleport-lib-js&amp;utm_campaign=Badge_Grade)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Live Demo on CodeSandbox
https://codesandbox.io/s/nrn9ylwn7m

## Getting started

Create a new project:
```
npm init -y
```

Install Teleport libraries
```
npm i @teleporthq/teleport-lib-js @teleporthq/teleport-elements-core @teleporthq/teleport-generator-html
```

Create an `index.js` file
```javascript
// load libraries
const Teleport = require('@teleporthq/teleport-lib-js').default
const TeleportElementsCore = require('@teleporthq/teleport-elements-core')
const TeleportGeneratorHtml = require('@teleporthq/teleport-generator-html').default

const teleport = new Teleport()
const { definitions, mappingHtml } = TeleportElementsCore

// sample of a Teleport Project 
const teleportProject = require('./data/sample1.json')

// setup Teleport for html code generation 
teleport.useLibrary(definitions)  
teleport.useMapping(mappingHtml)
teleport.useGenerator(new TeleportGeneratorHtml())

const projectFiles = teleport.target('html').generator.generateProject(teleportProject)

console.log(projectFiles)
```

Create a `data/sample1.json' file 
```json
{
  "name": "Demo",
  "components": {
    "Component1": {
      "name": "Component1",
      "content": {
        "name": "content",
        "type": "View",
        "source": "teleport-elements-core",
        "children": "Hello from a child",
        "style": {}
      }
    },
    "Component2": {
      "name": "Component2",
      "content": {
        "type": "Text",
        "name": "Component2",
        "source": "teleport-elements-core",
        "children": "hello from Component2"
      }
    }
  },
  "pages": {
    "Page1": {
      "name": "Page1",
      "content": {
        "name": "content",
        "type": "View",
        "source": "teleport-elements-core",
        "children": [
          {
            "source": "components",
            "type": "Component2"
          }
        ]
      }
    }
  }
}
```

Run
`node index.js'

## Motivation
In a world in which information is delivered through multiple channels and different technologies, we believe that there are many benefits in decoupling the description of User Interfaces from the code which will render them. 

This approach is not new. Our concept has been greatly influenced by Facebooks's [React](https://reactjs.org/) library, where React is a component based User Interface description language and [ReactDOM](https://reactjs.org/docs/react-dom.html) and [React-Native](https://facebook.github.io/react-native/) are implementations of the same User Interface description in different targets.

However, we wanted to go one step further and to propose a format which would be 100% code-free and which could eventually become a  **protocol** for a bi-directional and friction-less communication layer between the designers's tools and developers' technologies and frameworks. This protocol is based on a JSON format and we call it an "Intermediary representation" with similarities to vDom and AST.

## Principles
At a high-level, a User Interface can have 3 main *digital states*: a `description state` (such as a Photoshop or Sketch file), a `code state`, (such as a HTML file) and an `instance state` (such as the DOM equivalent of an HTML file). These 3 states are the design-to-code pipeline for the user interface of any standard web application:

```
design state ---> code state ---> instance state 
```

Until very recently, those three states were completely distinct and managed by specialized tools, respectively, design tools, code editors, and browsers. It is only in the past two years that *code* and *instance* states (and tools) got significantly closer through hot-reloading mechanisms.

Teleport closes the gap and allows for a real-time experience through all the digital states of a user interface.

## How to use
### Install
`npm i @teleporthq/teleport-lib-js @teleporthq/teleport-definitions-core @teleporthq/teleport-mapping-html @teleporthq/teleport-mapping-react @teleporthq/teleport-renderer-react`

### Tutorial

`@teleporthq/teleport-lib-js` is the main library. The library uses a series of *plugins* to transform a JSON Intermediary Representation to code or a working instance.  

Plugins can be of 4 different types:
- **definition**: a list of (code-free) primitive elements with which Teleport can read and make sense of a JSON IR
- **mapping**: a list of mappings between an element definition and its representation for a specific code
- **generator**: an engine which uses definitions and mappings to return the code (under the form of a list of files)
- **renderer**: an engine which uses definitions and mappings to render a working instance of the generated code
